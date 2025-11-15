import clsx from 'clsx'
import {
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function Tooltip({ children, className, ...props }: TooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null)

  const [shown, setShown] = useState(true)

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setShown(false)
      }
    }

    window.addEventListener('pointerdown', handlePointerDown)
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [])

  return (
    <div
      className={clsx(
        'pointer-events-none absolute z-10 rounded-2xl bg-(--accent-themed) p-2 text-center transition-opacity select-none',
        !shown && 'opacity-0',
        className,
      )}
      ref={tooltipRef}
      {...props}
    >
      {children}
      <div className="absolute top-full left-1/2 size-4 -translate-x-1/2 border-t-8 border-r-8 border-l-8 border-t-(--accent-themed) border-r-transparent border-l-transparent" />
    </div>
  )
}

export { Tooltip }
