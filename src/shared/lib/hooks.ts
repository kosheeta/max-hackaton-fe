import { useEffect, useState } from 'react'

interface Viewport {
  height: number
  width: number
}

export function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>({
    height: window.innerHeight,
    width: window.innerWidth,
  })

  useEffect(() => {
    function handleResize() {
      setViewport({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return viewport
}
