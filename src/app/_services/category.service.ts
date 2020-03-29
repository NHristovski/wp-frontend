import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../_helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = Constants.baseApiUrl + '/product'; // 'https://wp-api-gateway.herokuapp.com/product';

  constructor(private http: HttpClient) {
  }

  getAllCategories() {
    return this.http.get(`${this.apiUrl}/category`);
  }
  
}
