export interface User {
  fullName: string;
  email: string;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  imageUrl?: string | null;
  price?: number | null;
  ingredients?: string[] | null;
}

export interface CartItem {
  category: string;
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
}
