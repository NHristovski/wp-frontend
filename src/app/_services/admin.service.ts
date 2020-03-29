import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../_helpers/constants';
import {AddCategoryRequest} from '../_models/AddCategoryRequest';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = Constants.baseApiUrl + '/product/admin';

  constructor(private http: HttpClient) {
  }

  test() {
    return this.http.get(`${this.apiUrl}`);
  }

  addCategory(name: string) {
    const request = new AddCategoryRequest();
    request.categoryName = name;

    return this.http.post(`${this.apiUrl}/addCategory`, request);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.apiUrl}/deleteCategory/${id}`);
  }

  deleteProduct(id: number) {
    console.log('in delete product')
    return this.http.delete(`${this.apiUrl}/deleteProduct/${id}`);
  }

  search(value: string) {
    return this.http.get(`${this.apiUrl}/search/${value}`);
  }
}
