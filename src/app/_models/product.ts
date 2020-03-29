import {Category} from './category';

export class Product {
  id: number;
  title: string;
  description: string;
  imageLocation: string;
  price: number;
  averageRating: number;
  totalRatings: number;
  currentUserRating: number;
  stock: number;
  categories: Category[];
}



