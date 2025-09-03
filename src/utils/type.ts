export interface User {
  id: number;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  image?: string;
  accessToken: string;
  refreshToken: string;
}

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};
