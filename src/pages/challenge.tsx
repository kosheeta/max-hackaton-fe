import { Button, Container, Flex, Panel } from '@maxhub/max-ui'
import { AnimatePresence, type DragHandler, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import { useViewport } from '../shared/lib/hooks'
import { layoutElements } from '../shared/lib/layout'

// temporary
const data = {
  elements: [
    { id: 'ramp', name: 'Пандус', width: 282.04 },
    {
      id: 'tactile-tiles',
      name: 'Тактильные плитки',
      width: 367.46,
    },
    {
      id: 'schedule',
      name: 'Расписание',
      width: 182.04,
    },
  ],
  id: 'transport',
  name: 'Транспортная доступность',
  scene_width: 786,
}

function ChallengePage() {
  const panelRef = useRef<HTMLDivElement>(null)
  const paletteRef = useRef<HTMLDivElement>(null)

  const [placedElements, setPlacedElements] = useState<
    { id: string; x: number; y: number }[]
  >([])

  const viewport = useViewport()
  const sceneScale = viewport.width / data.scene_width

  useEffect(() => {
    if (paletteRef.current) {
      const container = paletteRef.current
      const elements = [...container.querySelectorAll('img')]
      layoutElements(container, elements, 800, 16)
    }
  }, [])

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
  }

  const handleFinishClick = () => {
    console.log(placedElements)

    window.WebApp.close()
  }

  const isAllElementsPlaced = placedElements.length === data.elements.length

  return (
    <Panel mode="primary" ref={panelRef}>
      <Flex className="relative h-full" direction="column">
        <img
          alt={data.name}
          className="aspect-3/4 w-full object-cover"
          src={`images/challenges/${data.id}/scene.png`}
        />

        <Container
          className="relative -mt-4 flex h-full w-full items-center justify-center rounded-t-2xl bg-(--background-surface-primary) pt-4 pb-8"
          ref={paletteRef}
        >
          {data.elements.map((element) => (
            <motion.img
              alt={element.name}
              className="absolute h-auto cursor-pointer"
              data-element-id={element.id}
              drag
              dragConstraints={panelRef}
              dragElastic={0.2}
              dragMomentum={false}
              key={element.id}
              onDragEnd={handleDragEnd}
              src={`images/challenges/${data.id}/elements/${element.id}.png`}
              style={{
                width: element.width * sceneScale,
              }}
              whileDrag={{
                cursor: 'grabbing',
                scale: 1.1,
              }}
            />
          ))}

          <AnimatePresence>
            {isAllElementsPlaced && (
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                initial={{ opacity: 0, scale: 0.96 }}
              >
                <Button mode="primary" onClick={handleFinishClick} size="large">
                  Закончить
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </Flex>
    </Panel>
  )
}

export { ChallengePage }
