import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from '../_services/shopping-cart.service';
import {ShoppingCart} from '../_models/shoppingCart/shoppingCart';
import {Router} from '@angular/router';
import {ShoppingCartItem} from '../_models/shoppingCart/shoppingCartItem';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {CheckoutComponent} from '../checkout/checkout.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AlertService} from '../_services';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public shoppingCart: ShoppingCart;
  displayedColumns = ['product', 'name', 'quantity', 'cost', 'action'];
  public dataSource = new MatTableDataSource();

  constructor(private shoppingCartService: ShoppingCartService,
              private router: Router,
              public dialog: MatDialog,
              private alertService: AlertService) {
  }

  ngOnInit(): void {

    this.shoppingCartService.getShoppingCart()
      .subscribe(data => {
        this.shoppingCart = new ShoppingCart();
        this.shoppingCart.id = data.id;
        this.shoppingCart.items = data.shoppingCartItems;

        this.dataSource.data = data.shoppingCartItems;

      }, error => {
        this.alertService.openSnackBar(`Failed to get the shopping cart!`, true);
      });
  }


  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.shoppingCart.items.reduce((acc, value) => acc + (value.product.price * value.quantity), 0);
  }

  productCatalog() {
    this.router.navigate(['/']);
  }

  incrementQuantity(id: number) {
    this.shoppingCartService.incrementQuantity(id)
      .subscribe(data => {
        this.shoppingCart.items.map(i => {
          if (i.id === id) {
            i.quantity = i.quantity + 1;
          }
          return i;
        });
      }, error => {
        this.alertService.openSnackBar(`Failed to increment the product quantity!`, true);
      });
  }

  decrementQuantity(id: number) {
    this.shoppingCartService.decrementQuantity(id)
      .subscribe(data => {
        this.shoppingCart.items.map(i => {
          if (i.id === id) {
            i.quantity = i.quantity - 1;
          }
          return i;
        });
      }, error => {
        this.alertService.openSnackBar(`Failed to decrement the product quantity!`, true);
      });
  }

  delete(cartId: number, item: ShoppingCartItem) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.shoppingCartService.delete(cartId, item.id)
          .subscribe(data => {
            const index = this.shoppingCart.items.indexOf(item, 0);
            if (index > -1) {
              this.shoppingCart.items.splice(index, 1);
            }

            this.dataSource.data = this.shoppingCart.items;
            this.alertService.openSnackBar(`Removed the product from the shopping cart!`, false);
          }, error => {
            this.alertService.openSnackBar(`Failed to delete the product!`, true);
          });
      }
    });
  }

  proceedToCheckout() {
    const dialogRef = this.dialog.open(CheckoutComponent, {
      width: '500px',
      height: '620px'
    });

    dialogRef.componentInstance.shoppingCart = this.shoppingCart;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.shoppingCart.items = [];
        this.dataSource.data = [];
      }
    });
  }
}
