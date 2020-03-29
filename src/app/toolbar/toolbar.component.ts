import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../_services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  public username: string;

  constructor(private authService: AuthenticationService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.username = this.authService.currentUserValue.username;
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login'], {queryParams: {logout: true}});
  }

  shoppingCart() {
    this.router.navigate(['/shopping-cart']);
  }

  history() {
    this.router.navigate(['/shopping-cart-history']);
  }
}
