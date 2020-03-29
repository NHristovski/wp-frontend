import {Product} from '../product';

export class ShoppingCartItem {
  id: number;
  pending: boolean;
  product: Product;
  quantity: number;
  bought: boolean;
  dateBought: string;
}
