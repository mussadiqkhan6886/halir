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
  onSale: boolean
  salePrice: number
}

type PerfumeType = {
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

export interface NoteItem {
  name: string;
  image: File | null;
  preview: string;
}

export interface SizeForm {
  slug: string;
  label: string;
  ml: number | '';
  price: number | '';
  onSale: boolean;
  salePrice: number | '';
  sku: string;
  in_stock: boolean;
  stock: number | '';
  images: File[];
  previews: string[];
}

export interface PerfumeForm {
  slug: string;
  name: string;
  categories: string[];
  tagline: string;
  description: string;
  mainImage: File | null;
  mainImagePreview: string;
  gender: 'men' | 'women' | 'unisex' | '';
  longevity: string;
  notes: {
    top: NoteItem[];
    heart: NoteItem[];
    base: NoteItem[];
  };
  sizes: SizeForm[];
}


