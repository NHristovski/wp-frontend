import {Category} from './category';

export class SimpleProduct {
  id: number;
  title: string ;
  imageLocation: string ;
  description: string ;
  price: number;
  stock: number;
  categories: Category[];
}
