import { Panel, Spinner } from '@maxhub/max-ui'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

import type { ChallengeResponse } from '../shared/lib/types'

import { Scene } from '../components/scene'
import {
  getElementImageSource,
  getSceneImageSource,
} from '../components/scene/lib'
import { backendUrl } from '../shared/config'
import { preloadImages } from '../shared/lib/preload'

function ChallengePage() {
  const [data, setData] = useState<ChallengeResponse | null>(null)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${backendUrl}/api/challenges`, {
        headers: {
          'X-Init-Data': window.WebApp.initData,
        },
      })
      const json = (await response.json()) as ChallengeResponse

      const images = [
        getSceneImageSource(json.id),
        ...json.elements.map((element) =>
          getElementImageSource(json.id, element.id),
        ),
      ]

      await preloadImages(images)

      setData(json)

      window.WebApp.HapticFeedback.impactOccurred('light', false)
    }

    fetchData()
  }, [])

  return (
    <Panel mode="primary">
      <AnimatePresence mode="popLayout">
        {data ? (
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="h-full"
            initial={{ opacity: 0, scale: 0.96 }}
            key="scene"
          >
            <Scene data={data} />
          </motion.div>
        ) : (
          <motion.div
            className="flex h-full"
            exit={{ opacity: 0 }}
            initial={{ opacity: 1 }}
            key="loader"
          >
            <Spinner className="m-auto" size={40} />
          </motion.div>
        )}
      </AnimatePresence>
    </Panel>
  )
}

export { ChallengePage }
