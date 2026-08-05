import { useCallback, useEffect, useRef, useState } from 'react'

type Props = {
  before: string
  after: string
  beforeLabel?: string
  afterLabel?: string
}

export function BeforeAfterSlider({
  before,
  after,
  beforeLabel = 'До',
  afterLabel = 'После',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50)
  const dragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, x)))
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      updatePosition(clientX)
    }

    const onUp = () => {
      dragging.current = false
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [updatePosition])

  const startDrag = () => {
    dragging.current = true
  }

  return (
    <div
      className="before-after"
      ref={containerRef}
      onMouseDown={(e) => {
        startDrag()
        updatePosition(e.clientX)
      }}
      onTouchStart={(e) => {
        startDrag()
        updatePosition(e.touches[0].clientX)
      }}
    >
      <img src={after} alt={afterLabel} className="before-after__img before-after__img--after" />
      <div className="before-after__before" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src={before} alt={beforeLabel} className="before-after__img before-after__img--before" />
      </div>
      <div className="before-after__handle" style={{ left: `${position}%` }}>
        <span className="before-after__arrow before-after__arrow--left" aria-hidden="true" />
        <span className="before-after__line" />
        <span className="before-after__arrow before-after__arrow--right" aria-hidden="true" />
      </div>
      <span className="before-after__label before-after__label--before">{beforeLabel}</span>
      <span className="before-after__label before-after__label--after">{afterLabel}</span>
    </div>
  )
}
