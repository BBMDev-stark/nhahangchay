export type DishCategory =
  | "khai-vi"
  | "salad"
  | "soup"
  | "mon-chinh"
  | "com"
  | "mi"
  | "lau"
  | "dessert"
  | "beverage";

export type DishTag = "best-seller" | "new" | "chef-choice" | "vegan";

export interface Dish {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number; // VND
  calories: number;
  ingredients: string[];
  image: string;
  category: DishCategory;
  tags: DishTag[];
  featured?: boolean;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "khong-gian" | "mon-an" | "su-kien" | "chi-tiet";
  width: number;
  height: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: 1 | 2 | 3 | 4 | 5;
  content: string;
  date: string; // ISO
}

export interface Chef {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  specialty: string;
}

export interface Ingredient {
  id: string;
  name: string;
  origin: string;
  description: string;
  image: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "dat-ban" | "thuc-don" | "khong-gian" | "thanh-toan";
}

export interface ReservationFormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  specialRequest?: string;
}
