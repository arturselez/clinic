import { assetUrl } from '../lib/assets'

export type WorkGridSection = {
  type: 'grid'
  id: string
  title: string
  images: string[]
}

export type WorkSliderSection = {
  type: 'slider'
  id: string
  title: string
  images: string[]
}

export type WorkBeforeAfterSection = {
  type: 'beforeafter'
  id: string
  title: string
  before: string
  after: string
  beforeLabel?: string
  afterLabel?: string
}

export type WorkSection =
  | WorkGridSection
  | WorkSliderSection
  | WorkBeforeAfterSection

/** Разделы «Наши работы» — локальные WebP */
export const workSections: WorkSection[] = [
  {
    type: 'grid',
    id: 'veneers',
    title: 'Виниры',
    images: [
      assetUrl('/images/veneers-01.webp'),
      assetUrl('/images/veneers-02.webp'),
      assetUrl('/images/veneers-03.webp'),
      assetUrl('/images/veneers-04.webp'),
    ],
  },
  {
    type: 'slider',
    id: 'emax',
    title: 'Восстановление зубов керамическими вкладками e.max',
    images: [
      assetUrl('/images/emax-01.webp'),
      assetUrl('/images/emax-02.webp'),
      assetUrl('/images/emax-03.webp'),
      assetUrl('/images/emax-04.webp'),
      assetUrl('/images/emax-05.webp'),
      assetUrl('/images/emax-06.webp'),
    ],
  },
  {
    type: 'slider',
    id: 'filling',
    title: 'Восстановление зубов пломбировочным материалом светового отверждения',
    images: [
      assetUrl('/images/filling-01.webp'),
      assetUrl('/images/filling-02.webp'),
      assetUrl('/images/filling-03.webp'),
      assetUrl('/images/filling-04.webp'),
      assetUrl('/images/filling-05.webp'),
    ],
  },
  {
    type: 'beforeafter',
    id: 'hygiene',
    title: 'Профессиональная гигиена полости рта',
    before: assetUrl('/images/hygiene-before.webp'),
    after: assetUrl('/images/hygiene-after.webp'),
    beforeLabel: 'До',
    afterLabel: 'После',
  },
]
