export interface MenuItem {
  id: number;
  nameAr: string;
  nameHe: string;
  descriptionAr?: string;
  descriptionHe?: string;
  price: number;
  image: string;
  tags?: string[];
  categoryId?: string;
}

export interface Category {
  id: string;
  nameAr: string;
  nameHe: string;
  descriptionAr?: string;
  descriptionHe?: string;
  items: MenuItem[];
}

export interface Restaurant {
  name: string;
  nameAr: string;
  nameHe: string;
  tagline: string;
  taglineAr: string;
  taglineHe: string;
}

export interface MenuData {
  restaurant: Restaurant;
  categories: Category[];
}
