interface PositionedElement {
  el: HTMLElement
  height: number
  vx: number
  vy: number
  width: number
  x: number
  y: number
}

// Force-directed layout algorithm
export function layoutElements(
  container: HTMLElement,
  elements: HTMLElement[],
  iterations: number = 500,
  padding: number = 20, // расстояние от краёв контейнера
): void {
  const rect = container.getBoundingClientRect()
  const containerWidth = rect.width
  const containerHeight = rect.height

  const innerWidth = containerWidth - 2 * padding
  const innerHeight = containerHeight - 2 * padding

  // Собираем внутренние данные
  const items: PositionedElement[] = elements.map((el) => {
    const w = el.offsetWidth
    const h = el.offsetHeight
    return {
      el,
      height: h,
      vx: 0,
      vy: 0,
      width: w,
      x: padding + Math.random() * (innerWidth - w),
      y: padding + Math.random() * (innerHeight - h),
    }
  })

  const repulsion = 800 // сила отталкивания
  const attraction = 0.02 // притяжение к центру
  const damping = 0.85 // затухание скорости

  for (let step = 0; step < iterations; step++) {
    for (let i = 0; i < items.length; i++) {
      const a = items[i]
      let fx = 0
      let fy = 0

      // Отталкивание от других элементов
      for (let j = 0; j < items.length; j++) {
        if (i === j) continue
        const b = items[j]
        const dx = a.x + a.width / 2 - (b.x + b.width / 2)
        const dy = a.y + a.height / 2 - (b.y + b.height / 2)
        const dist2 = dx * dx + dy * dy

        if (dist2 === 0) continue
        const dist = Math.sqrt(dist2)
        const overlap = Math.max(0, (a.width + b.width) / 2 - dist)

        if (overlap > 0) {
          const force = (repulsion * overlap) / dist2
          fx += force * dx
          fy += force * dy
        }
      }

      // Притяжение к центру контейнера
      const cx = containerWidth / 2
      const cy = containerHeight / 2
      fx += (cx - (a.x + a.width / 2)) * attraction
      fy += (cy - (a.y + a.height / 2)) * attraction

      // Обновляем скорость и позицию
      a.vx = (a.vx + fx) * damping
      a.vy = (a.vy + fy) * damping

      a.x += a.vx
      a.y += a.vy

      // Ограничиваем в пределах контейнера с учётом padding
      a.x = Math.max(padding, Math.min(containerWidth - padding - a.width, a.x))
      a.y = Math.max(
        padding,
        Math.min(containerHeight - padding - a.height, a.y),
      )
    }
  }

  // Применяем финальные позиции
  for (const item of items) {
    const el = item.el
    el.style.position = 'absolute'
    el.style.left = `${item.x}px`
    el.style.top = `${item.y}px`
  }
}
