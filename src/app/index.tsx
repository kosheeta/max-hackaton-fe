import { MaxUI } from '@maxhub/max-ui'
import { useEffect } from 'react'
import '@maxhub/max-ui/dist/styles.css'

import './styles/index.css'
import { ChallengePage } from '../pages/challenge'

function App() {
  useEffect(() => {
    window.WebApp.ready()
    window.WebApp.enableClosingConfirmation()
  }, [])

  return (
    <MaxUI className="mx-auto h-lvh max-w-120">
      <ChallengePage />
    </MaxUI>
  )
}

export { App }
