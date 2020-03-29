import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class WorkerService {

  private apiUrl = 'http://localhost:8762';

  constructor(private http: HttpClient) {
  }

  getMessage() {
    this.http.get<any>(`${this.apiUrl}/worker/message`)
      .subscribe(body => {
          console.log('body', body);
        },
        error => {
          console.log('Failed to get message', error);
        });
  }
}

