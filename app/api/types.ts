export interface Review {
  rating: number;
  text: string;
}

export interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  description: string;
  reviews: Review[];
}

export interface Cart {
  products: {
    id: number;
    name: string;
    image: string;
    price: number;
  }[];
}

export interface ResumeTemplate {
  styles: {
    id: string;
    name: string;
    thumbnail_url: string;
    cloudinary_public_url: string;
    description: string;
  }[];
}
