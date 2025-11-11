import { MaxUI } from '@maxhub/max-ui'
import '@maxhub/max-ui/dist/styles.css'

import './styles/index.css'
import { ChallengePage } from '../pages/challenge'

function App() {
  return (
    <MaxUI className="mx-auto h-dvh max-w-120">
      <ChallengePage />
    </MaxUI>
  )
}

export { App }
