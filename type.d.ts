type PerfumeNote = {
  name: string
  image: string
}

type PerfumeSize = {
  slug: string
  label: string
  ml: number
  price: number
  currency: string
  sku: string
  in_stock: boolean
  badge: string | null
  images: string[]
  stock: number
}

type Perfume = {
  id: string
  slug: string
  name: string
  categories: string[]
  tagline: string
  description: string
  mainImage: string
  gender: "men" | "women" | "unisex"
  longevity: string
  season: string[]
  notes: {
    top: PerfumeNote[]
    heart: PerfumeNote[]
    base: PerfumeNote[]
  }
  sizes: PerfumeSize[]
}