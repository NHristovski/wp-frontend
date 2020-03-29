import {Component, OnInit} from '@angular/core';
import {AdminService} from '../_services/admin.service';
import {CategoryService} from '../_services/category.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AddProductComponent} from '../add-product/add-product.component';
import {SimpleProduct} from '../_models/simpleProduct';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {AlertService} from '../_services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  categories: any = [];
  categoryForm: FormGroup;
  submitted = false;
  submittedSearch = false;
  searchForm: FormGroup;
  products: any;
  displayedColumns = ['product', 'id', 'name', 'action'];
  onceSubmited = false;
  hasProducts = false;

  constructor(private adminService: AdminService,
              private categoryService: CategoryService,
              private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private alertService: AlertService) {
  }


  get getFormControls() {
    return this.categoryForm.controls;
  }

  get getSearchFormControls() {
    return this.searchForm.controls;
  }


  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    }, error => {
      this.alertService.openSnackBar('Failed to get the categories!', true);
    });

    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required]
    });

    this.searchForm = this.formBuilder.group({
      term: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log('in on submit');

    if (this.categoryForm.invalid) {
      console.error('invalid form');
      return;
    }

    this.addCategory(this.categoryForm.controls.name.value);
    this.submitted = false;
    this.categoryForm.reset();
  }

  onSearchSubmit() {
    this.submittedSearch = true;

    if (this.searchForm.invalid) {
      console.error('invalid form');
      return;
    }

    this.adminService.search(this.searchForm.controls.term.value).subscribe(data => {
      console.log('found data', data);
      this.products = data;
      this.onceSubmited = true;
      this.hasProducts = this.products.length !== 0;
    }, error1 => {
      this.alertService.openSnackBar('Search failed!', true);
      this.hasProducts = false;
    });

    this.submittedSearch = false;
    this.searchForm.reset();
  }


  deleteCategory(id: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.deleteCategory(id).subscribe(data => {
          this.categories = this.categories.filter(cate => cate.id !== id);
          this.alertService.openSnackBar('Category deleted successfully', false);
        }, error => {
          this.alertService.openSnackBar('Failed to delete the category!', true);
        });
      }
    });
  }

  addCategory(name: string) {
    this.adminService.addCategory(name).subscribe(data => {
      this.categories.push(data);
      this.alertService.openSnackBar('Category added successfully', false);
    }, error => {
      this.alertService.openSnackBar('Failed to add the category! Check if category already exists', true);
    });
  }

  addProduct() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '700px',
      height: '750px'
    });

    dialogRef.componentInstance.categories = this.categories;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  edit(item: SimpleProduct) {

    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '700px',
      height: '750px'
    });

    dialogRef.componentInstance.categories = this.categories;
    dialogRef.componentInstance.title = item.title;
    dialogRef.componentInstance.productCategories = item.categories.map(cat => cat.categoryName);
    dialogRef.componentInstance.imageLocation = item.imageLocation;
    dialogRef.componentInstance.price = item.price;
    dialogRef.componentInstance.id = item.id;
    dialogRef.componentInstance.description = item.description;
    dialogRef.componentInstance.stock = item.stock;
    dialogRef.componentInstance.edit = true;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        const newProduct = dialogRef.componentInstance.newProduct;

        for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].id === item.id) {
            this.products[i].title = newProduct.title;
            this.products[i].categories = newProduct.categories;
            this.products[i].imageLocation = newProduct.imageLocation;
            this.products[i].price = newProduct.price;
            this.products[i].description = newProduct.description;
            this.products[i].stock = newProduct.stock;
          }
        }
      }
    });
  }
}


