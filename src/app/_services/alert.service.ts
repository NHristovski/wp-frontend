import {Injectable} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router,
              private snackBar: MatSnackBar) {

    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {

          this.keepAfterNavigationChange = false;
        } else {

          this.subject.next();
        }
      }
    });
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({type: 'success', text: message});
  }

  error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({type: 'error', text: message});
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  openSnackBar(message: string, error: boolean) {
    if (error) {
      this.snackBar.open(message, null, {
        duration: 4000,
        panelClass: ['red-snackbar']
      });
    } else {
      this.snackBar.open(message, null, {
        duration: 1500,
        panelClass: ['blue-snackbar']
      });
    }
  }
}
