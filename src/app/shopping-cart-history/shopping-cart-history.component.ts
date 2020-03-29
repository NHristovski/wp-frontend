import { Component, OnInit } from '@angular/core';
import {ShoppingCart} from '../_models/shoppingCart/shoppingCart';
import {ShoppingCartService} from '../_services/shopping-cart.service';
import {Router} from '@angular/router';
import {AlertService} from '../_services';

@Component({
  selector: 'app-shopping-cart-history',
  templateUrl: './shopping-cart-history.component.html',
  styleUrls: ['./shopping-cart-history.component.css']
})
export class ShoppingCartHistoryComponent implements OnInit {

  public shoppingCart: ShoppingCart;
  displayedColumns = ['product', 'name', 'quantity', 'cost', 'total', 'dateBought'];

  constructor(private shoppingCartService: ShoppingCartService,
              private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit(): void {

    this.shoppingCartService.getShoppingCartHistory()
      .subscribe(data => {
        this.shoppingCart = new ShoppingCart();
        this.shoppingCart.id = data.id;
        this.shoppingCart.items = data.shoppingCartItems;

      }, error => {
        this.alertService.openSnackBar(`Failed to get the shopping history!`, true);
      });
  }

  productCatalog() {
    this.router.navigate(['/']);
  }
}
