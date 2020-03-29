import {Component, OnInit} from '@angular/core';
import {AlertService, AuthenticationService, UserService} from '../_services';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkerService} from '../_services/worker.service';
import {ProductService} from '../_services/product.service';
import {CategoryService} from '../_services/category.service';
import {Products} from '../_models/products';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  response: any;
  products: any = [];
  maxPages: number;
  howMany: number;
  currentPage: number;
  categories: any = [];
  submitted = false;
  renderForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private workerService: WorkerService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.currentPage = 1;
    this.maxPages = 1;
    this.howMany = 9;

    this.getAllCategories();

    const categoryName = this.route.snapshot.queryParams['categoryName'] || '';

    if (categoryName) {
      this.getAllProductsForCategory(categoryName);
    } else {
      this.getAllProducts();
    }

    this.renderForm = this.formBuilder.group({
      render: ['', Validators.compose ([Validators.required, Validators.min(1)])]
    });

  }

  get getFormControls() {
    return this.renderForm.controls;
  }

  logout() {
    this.authenticationService.logout();
    this.alertService.openSnackBar(`Logout successful`, false);
    this.router.navigate(['/login']);
  }

  message() {
    this.workerService.getMessage();
  }

  getAllProducts() {
    this.productService.getAllProducts(this.currentPage - 1, this.howMany)
      .subscribe(data => {
        this.response = data;
        this.products = this.response.productResponses;
        this.maxPages = this.response.maxPages;
      }, error => {
        this.alertService.openSnackBar(`Failed to get the products`, true);
      });
  }

  getAllProductsForCategory(categoryName: string) {
    this.productService.getAllProductsForCategory(this.currentPage - 1, this.howMany, categoryName)
      .subscribe(data => {
        this.response = data;
        this.products = this.response.productResponses;
        this.maxPages = this.response.maxPages;
      }, error => {
        this.alertService.openSnackBar(`Failed to get the products for the category ${categoryName}`, true);
      });
  }

  getAllCategories() {
    this.categoryService.getAllCategories()
      .subscribe(data => {
        this.categories = data;
      }, error => {
        this.alertService.openSnackBar('Failed to get the product categories', true);
      });
  }

  previous() {
    this.currentPage = this.currentPage - 1;
    const categoryName = this.route.snapshot.queryParams['categoryName'] || '';
    if (categoryName) {
      this.getAllProductsForCategory(categoryName);
    } else {
      this.getAllProducts();
    }
  }
  next() {
    this.currentPage = this.currentPage + 1;
    const categoryName = this.route.snapshot.queryParams['categoryName'] || '';
    if (categoryName) {
      this.getAllProductsForCategory(categoryName);
    } else {
      this.getAllProducts();
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.renderForm.invalid) {
      console.error('invalid form');
      return;
    }
    this.howMany = this.getFormControls.render.value;
    this.submitted = false;

    const categoryName = this.route.snapshot.queryParams['categoryName'] || '';
    if (categoryName) {
      this.getAllProductsForCategory(categoryName);
    } else {
      this.getAllProducts();
    }
  }
}
