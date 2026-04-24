type PerfumeNote = {
  name: string
  image: string
}

type PerfumeSize = {
  slug: string
  label: string
  ml: number
  price: number
  sku: string
  in_stock: boolean
  images: string[]
  stock: number
  onSale: boolean
  salePrice: number
}

type PerfumeType = {
  _id: string
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


export type OrderItem = {
  name: string;
  price: number;
  onSale: boolean;
  salePrice: number | null;
  quantity: number;
  image: string;
  selectedSize: string;
  sku: string;
  personlized?: string;
};

export type UserDetails = {
  fullName: string;
  phone: string;
  email: string;
};
export type ShippingAddress = {
  city?: string;
  postalCode?: string;
  address: string;
};

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "cod" | "easypaisa";

export type OrderType = {
  _id: string; // MongoDB ID
  orderId: string;

  items: OrderItem[];

  totalPrice: number;

  userDetails: UserDetails;

  notes?: string;

  status: OrderStatus;

  shippingAddress: ShippingAddress;

  paymentMethod: PaymentMethod;

  paymentProof?: string | null;

  createdAt: string;
  updatedAt: string;
};

export interface reviewType {
  name: string
  message: string
  _id: string
}