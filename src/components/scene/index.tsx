import { Button, Container, Flex, Typography } from '@maxhub/max-ui'
import { AnimatePresence, type DragHandler, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import type {
  ChallengeResponse,
  CompleteChallengeRequest,
  PlacedElementRequest,
} from '../../shared/lib/types'

import { backendUrl } from '../../shared/config'
import { layoutElements, type PositionedElement } from '../../shared/lib/layout'
import { Tooltip } from '../../shared/ui'
import { getElementImageSource, getSceneImageSource } from './lib'

interface SceneProps {
  data: ChallengeResponse
}

function Scene({ data }: SceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const paletteRef = useRef<HTMLDivElement>(null)

  const [sceneScale, setSceneScale] = useState(1)
  const [initialElementPositions, setInitialElementPositions] = useState<
    PositionedElement[]
  >([])
  const [currentDragElement, setCurrentDragElement] = useState<null | string>(
    null,
  )
  const [placedElements, setPlacedElements] = useState<PlacedElementRequest[]>(
    [],
  )
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    function handleResize() {
      if (paletteRef.current) {
        setSceneScale(paletteRef.current.offsetWidth / data.scene_width)
      }
    }
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (paletteRef.current) {
      const container = paletteRef.current
      const elements = [...container.querySelectorAll('img')]
      const positions = layoutElements(container, elements, 800, 16)

      setInitialElementPositions(positions)
    }
  }, [])

  const handleDragStart: DragHandler = (event) => {
    const elementId = (event.target as HTMLElement).dataset.elementId
    if (elementId) {
      setCurrentDragElement(elementId)
      window.WebApp.HapticFeedback.impactOccurred('light')
    }
  }

  const handleDragEnd: DragHandler = (event, info) => {
    const elementId = (event.target as HTMLElement).dataset.elementId

    if (paletteRef.current && elementId) {
      const paletteRect = paletteRef.current.getBoundingClientRect()

      if (info.point.y < paletteRect.top) {
        if (placedElements.some((element) => element.id === elementId)) {
          setPlacedElements((prev) =>
            prev.map((element) =>
              element.id === elementId
                ? { ...element, x: info.point.x, y: info.point.y }
                : element,
            ),
          )
        } else {
          setPlacedElements((prev) => [
            ...prev,
            { id: elementId, x: info.point.x, y: info.point.y },
          ])
        }
      } else {
        setPlacedElements((prev) =>
          prev.filter((element) => element.id !== elementId),
        )
      }
    }

    setCurrentDragElement(null)
    window.WebApp.HapticFeedback.impactOccurred('light')
  }

  const handleFinishClick = async () => {
    window.WebApp.HapticFeedback.impactOccurred('medium')

    setIsPending(true)

    await fetch(`${backendUrl}/api/challenges/complete`, {
      body: JSON.stringify({
        placed_elements: placedElements,
      } as CompleteChallengeRequest),
      headers: {
        'Content-Type': 'application/json',
        'X-Init-Data': window.WebApp.initData,
      },
      method: 'POST',
    })

    window.WebApp.HapticFeedback.notificationOccurred('success')

    window.WebApp.disableClosingConfirmation()
    window.WebApp.close()
  }

  const isAllElementsPlaced =
    placedElements.length === data.elements.length && !currentDragElement

  return (
    <Flex className="relative h-full" direction="column" ref={sceneRef}>
      <div className="h-full min-h-50 w-full overflow-hidden">
        <img
          alt={data.name}
          className="h-full w-full object-cover"
          src={getSceneImageSource(data.id)}
        />
      </div>

      <Container
        className="relative -mt-4 flex h-full max-h-5/12 w-full shrink-0 grow items-center justify-center rounded-t-2xl bg-(--background-surface-primary) pt-4 pb-8"
        ref={paletteRef}
      >
        <Tooltip className="top-4 left-1/2 -translate-x-1/2 -translate-y-full">
          <Typography.Body asChild variant="small">
            <p>
              Перетащите элементы доступности на нужные места, чтобы пройти
              уровень
            </p>
          </Typography.Body>
        </Tooltip>

        {data.elements.map((element) => {
          const position = initialElementPositions.find(
            (position) => position.el.dataset.elementId === element.id,
          )

          return (
            <motion.img
              alt={element.name}
              className="absolute h-auto cursor-pointer"
              data-element-id={element.id}
              drag={!isPending}
              dragConstraints={sceneRef}
              dragElastic={0.2}
              dragMomentum={false}
              key={element.id}
              onDragEnd={handleDragEnd}
              onDragStart={handleDragStart}
              src={getElementImageSource(data.id, element.id)}
              style={{
                left: position?.x,
                top: position?.y,
                width: element.width * sceneScale,
              }}
              whileDrag={{
                cursor: 'grabbing',
                scale: 1.1,
              }}
            />
          )
        })}

        <AnimatePresence>
          {isAllElementsPlaced && (
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              initial={{ opacity: 0, scale: 0.96 }}
            >
              <Button
                loading={isPending}
                mode="primary"
                onClick={handleFinishClick}
                size="large"
              >
                Закончить
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Flex>
  )
}

export { Scene }
