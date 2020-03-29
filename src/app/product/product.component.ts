import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../_models/product';
import {ProductService} from '../_services/product.service';
import {MatDialog} from '@angular/material/dialog';
import {ProductDetailsComponent} from '../product-details/product-details.component';
import {ShoppingCartService} from '../_services/shopping-cart.service';
import {AlertService} from '../_services';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  @Input() currentRate;

  constructor(private productService: ProductService,
              private shoppingCardService: ShoppingCartService,
              private alertService: AlertService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  ratingClicked() {
    setTimeout(() => this.productService.rateProduct(this.product.id, this.currentRate)
      .subscribe(data => {
        this.product = data;
      }, error => {
        this.alertService.openSnackBar(`Failed to rate the product`, true);
      }), 200);
  }

  openDialog(productRef: Product) {
    const dialogRef = this.dialog.open(ProductDetailsComponent);
    dialogRef.componentInstance.product = productRef;

    dialogRef.afterClosed().subscribe(result => {
      this.product = dialogRef.componentInstance.product;
      const quantity = dialogRef.componentInstance.howMany;

      if (result) {
        this.shoppingCardService.addProductToCart(this.product.id, quantity)
          .subscribe(
            data => {
              this.alertService.openSnackBar(`Product ${this.product.title} added to the shopping cart successfully`, false);
            }, error => {
              this.alertService.openSnackBar(`Failed to add the product ${this.product.title} to the shopping cart!`, true);
            }
          );
      }
    });
  }
}
