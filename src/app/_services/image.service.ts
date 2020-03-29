import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ImageService {
  private url = 'https://api.imgur.com/3/image';
  private clientId = '3e5933f4f165798';

  constructor(private http: HttpClient) {
  }

  uploadImage(imageFile: File): any {
    const formData = new FormData();
    formData.append('image', imageFile, imageFile.name);

    const header = new HttpHeaders({
      authorization: 'Client-ID ' + this.clientId
    });

    return this.http.post(this.url, formData, {headers: header});
  }
}
