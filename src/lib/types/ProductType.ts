export interface ProductType {
  ratings: Ratings;
  _id: string;
  name: string;
  description: string;
  price: number;
  images: Image[];
  categories: Category[];
  brand: string;
  stock: number;
  totalReviews: number;
  avgRating: number;
  user: string;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Ratings {
  rating1: number;
  rating2: number;
  rating3: number;
  rating4: number;
  rating5: number;
}

export interface Image {
  public_id: string;
  url: string;
  _id: string;
}

export interface Category {
  category_id: string;
  category_slug: string;
  _id: string;
}

export interface Review {
  userId: string;
  name: string;
  rating: number;
  comment: string;
  images: Image2[];
  _id: string;
  reviewedAt: string;
}

export interface Image2 {
  public_id: string;
  url: string;
  _id: string;
}
