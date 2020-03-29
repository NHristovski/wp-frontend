import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AddProductToShoppingCartRequest} from '../_models/shoppingCart/addProductToShoppingCartRequest';
import {Observable} from 'rxjs';
import {BuyRequest} from '../_models/shoppingCart/buyRequest';
import {Constants} from '../_helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private apiUrl = Constants.baseApiUrl + '/product';

  // private apiUrl = 'https://wp-api-gateway.herokuapp.com/product';

  constructor(private http: HttpClient) {
  }

  addProductToCart(id: number, quantity: number) {
    const request = new AddProductToShoppingCartRequest();
    request.productId = id;
    request.quantity = quantity;

    return this.http.post(`${this.apiUrl}/shoppingCart/`, request);
  }

  getShoppingCart(): Observable<any> {

    return this.http.get(`${this.apiUrl}/shoppingCart`);
  }

  getShoppingCartHistory(): Observable<any> {

    return this.http.get(`${this.apiUrl}/shoppingCart/history`);
  }

  incrementQuantity(id: number) {
    return this.http.put(`${this.apiUrl}/shoppingCart/item/increment/${id}`, null);
  }

  decrementQuantity(id: number) {
    return this.http.put(`${this.apiUrl}/shoppingCart/item/decrement/${id}`, null);
  }

  delete(cartId: number, itemId: number) {
    return this.http.delete(`${this.apiUrl}/shoppingCart/delete/${cartId}/${itemId}`);
  }

  buy(buyReq: BuyRequest) {
    console.log('in buy service');
    return this.http.post(`${this.apiUrl}/shoppingCart/buy`, buyReq);
  }
}
