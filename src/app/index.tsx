import { useRef } from 'react'

import './styles/index.css'

function App() {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play()
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <video ref={videoRef}></video>

      <button onClick={handleClick}>Открыть камеру</button>
    </>
  )
}

export { App }
