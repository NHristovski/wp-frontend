import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AddProductRequest} from '../_models';
import {RateRequest} from '../_models/rateRequest';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {Constants} from '../_helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = Constants.baseApiUrl + '/product';

  // private apiUrl = 'https://wp-api-gateway.herokuapp.com/product';

  constructor(private http: HttpClient) {
  }

  addProduct(product: AddProductRequest) {
    return this.http.post(`${this.apiUrl}/admin/addProduct`, product);
  }

  getAllProducts(from: number, howMany: number) {
    return this.http.get(`${this.apiUrl}/product?from=${from}&howMany=${howMany}`);
  }

  rateProduct(id: number, currentRate: number): Observable<any> {
    const rateRequest = new RateRequest();
    rateRequest.id = id;
    rateRequest.rating = currentRate;
    return this.http.post(`${this.apiUrl}/product/rate`, rateRequest);
  }

  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/product/${id}`);
  }

  getAllProductsForCategory(from: number, howMany: number, categoryName: string) {
    return this.http.get(`${this.apiUrl}/product/forCategory/${categoryName}?from=${from}&howMany=${howMany}`);
  }

  editProduct(request: AddProductRequest, id: number) {
    return this.http.put(`${this.apiUrl}/admin/editProduct/${id}`, request);
  }
}
