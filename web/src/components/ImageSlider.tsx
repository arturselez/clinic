import { useState } from 'react'

type Props = {
  images: string[]
  title: string
}

export function ImageSlider({ images, title }: Props) {
  const [index, setIndex] = useState(0)
  const total = images.length

  const go = (dir: -1 | 1) => {
    setIndex((i) => (i + dir + total) % total)
  }

  if (total === 0) return null

  return (
    <div className="work-slider">
      <div className="work-slider__viewport">
        <img
          src={images[index]}
          alt={`${title} — фото ${index + 1}`}
          className="work-slider__image"
        />
        <button
          type="button"
          className="work-slider__arrow work-slider__arrow--prev"
          onClick={() => go(-1)}
          aria-label="Предыдущее фото"
        >
          ‹
        </button>
        <button
          type="button"
          className="work-slider__arrow work-slider__arrow--next"
          onClick={() => go(1)}
          aria-label="Следующее фото"
        >
          ›
        </button>
      </div>
      <div className="work-slider__dots" role="tablist" aria-label={`Слайды: ${title}`}>
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Фото ${i + 1}`}
            className={`work-slider__dot ${i === index ? 'work-slider__dot--active' : ''}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  )
}
