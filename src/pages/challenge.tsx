import { Panel, Spinner } from '@maxhub/max-ui'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

import type { ChallengeData } from '../shared/lib/types'

import { Scene } from '../components/scene'

function ChallengePage() {
  const [data, setData] = useState<ChallengeData | null>(null)

  useEffect(() => {
    // todo: fetch data and preload images

    setTimeout(() => {
      setData({
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
      })
    }, 2000)
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
