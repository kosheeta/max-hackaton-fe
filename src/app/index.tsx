import { MaxUI } from '@maxhub/max-ui'
import '@maxhub/max-ui/dist/styles.css'

import './styles/index.css'
import { useLayoutEffect, useRef } from 'react'

import { ChallengePage } from '../pages/challenge'

function App() {
  const maxUIRef = useRef<HTMLDivElement>(null)

  // костыль) чтобы не мелькало при попытке elastic скролла вверх на ios
  useLayoutEffect(() => {
    if (maxUIRef.current) {
      const backgroundColor = maxUIRef.current
        .computedStyleMap()
        .get('--background-surface-secondary')
      if (backgroundColor) {
        document.body.style.backgroundColor = backgroundColor.toString()
      }
    }
  }, [])

  return (
    <MaxUI className="mx-auto h-dvh max-w-120" ref={maxUIRef}>
      <ChallengePage />
    </MaxUI>
  )
}

export { App }
