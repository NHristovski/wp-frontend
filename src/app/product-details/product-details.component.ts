import {Component, OnInit} from '@angular/core';
import {Product} from '../_models/product';
import {ProductService} from '../_services/product.service';
import {Router} from '@angular/router';
import {AlertService} from '../_services';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  howMany: number;

  constructor(private productService: ProductService,
              private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.howMany = 1;
  }

  ratingClicked() {
    setTimeout(() => this.productService.rateProduct(this.product.id, this.product.currentUserRating)
      .subscribe(data => {
        this.product = data;
      }, error => {
        this.alertService.openSnackBar(`Failed to rate the product`, true);
      }), 200);
  }

  openHome(categoryName: string) {
    this.router.navigate(['/'], { queryParams: { categoryName }});
  }
}
