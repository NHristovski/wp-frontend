import {Component, OnInit} from '@angular/core';
import {ImageService} from '../_services/image.service';
import {ProductService} from '../_services/product.service';
import {AddProductRequest} from '../_models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CategoryService} from '../_services/category.service';
import {MatDialogRef} from '@angular/material/dialog';
import {AlertService} from '../_services';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  loading = false;
  submitted = false;
  imageFile: File;
  imageURL: string | ArrayBuffer;
  categories: any = [];
  newProduct: any;

  productCategories: any;
  title: string;
  imageLocation: string;
  price: number;
  id: number;
  description: string;
  stock: number;
  edit: boolean;


  // convenience getter for easy access to form fields
  get getFormControls() {
    return this.productForm.controls;
  }

  ngOnInit() {

    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    }, error1 => {
      this.alertService.openSnackBar(`Failed to get the categories!`, true);
    });

    this.productForm = this.formBuilder.group({
      title: [this.title, Validators.required],
      categories: [this.productCategories, Validators.required],
      description: [this.description, Validators.required],
      price: [this.price, Validators.required],
      stock: [this.stock, Validators.required],
    });
  }

  onSubmit() {

    this.submitted = true;

    if (this.productForm.invalid || (!this.imageFile && !this.imageLocation)) {
      this.alertService.openSnackBar('Invalid form!', true);
      return;
    }

    this.loading = true;

    if (this.edit) {
      this.editProduct();
    } else {
      this.addProduct();
    }
  }

  constructor(private imageService: ImageService,
              private productService: ProductService,
              private formBuilder: FormBuilder,
              private router: Router,
              private categoryService: CategoryService,
              private dialogRef: MatDialogRef<AddProductComponent>,
              private alertService: AlertService) {

  }

  imageInputChange(imageInput: any) {
    this.imageFile = imageInput.files[0];
    this.preview(this.imageFile);
  }

  preview(file) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (event) => {
      this.imageURL = reader.result;
    };
  }

  addProduct() {
    console.log('in add product');
    this.imageService.uploadImage(this.imageFile)
      .subscribe(
        data => {
          const imageLink = data.data.link;

          const addProductRequest = new AddProductRequest();

          addProductRequest.description = this.getFormControls.description.value;
          addProductRequest.title = this.getFormControls.title.value;
          addProductRequest.imageLocation = imageLink;
          addProductRequest.price = this.getFormControls.price.value;
          addProductRequest.stock = this.getFormControls.stock.value;
          addProductRequest.categoryNames = this.getFormControls.categories.value;

          this.productService.addProduct(addProductRequest)
            .subscribe(productData => {
              console.log('new product', productData);
              this.loading = false;
              this.alertService.openSnackBar('Product added successfully', false);
              this.dialogRef.close(true);
            }, error1 => {
              this.alertService.openSnackBar('Failed to add product', true);
              this.dialogRef.close(false);
            });
        },
        error2 => {
          this.alertService.openSnackBar('Failed to upload the image!', true);
          this.dialogRef.close(false);
        });
  }

  // getCategoryNames() {
  //   return this.categories.map(cat => cat.categoryName);
  // }
  private editProduct() {
    // if imageUrl is not null then change it
    if (this.imageFile) {
      this.imageService.uploadImage(this.imageFile)
        .subscribe(
          data => {
            const imageLink = data.data.link;

            const request = new AddProductRequest();

            request.description = this.getFormControls.description.value;
            request.title = this.getFormControls.title.value;
            request.imageLocation = imageLink;
            request.price = this.getFormControls.price.value;
            request.stock = this.getFormControls.stock.value;
            request.categoryNames = this.getFormControls.categories.value;

            this.productService.editProduct(request, this.id)
              .subscribe(productData => {
                console.log('new product', productData);
                this.loading = false;
                this.newProduct = productData;
                this.alertService.openSnackBar('Product added successfully', false);
                this.dialogRef.close(true);
              }, error11 => {
                this.alertService.openSnackBar('Failed to add the product', true);
                this.dialogRef.close(false);
              });
          },
          error12 => {
            this.alertService.openSnackBar('Failed to upload the image!', true);
            this.dialogRef.close(false);
          });
    } else {
      const editProductRequest = new AddProductRequest();

      editProductRequest.description = this.getFormControls.description.value;
      editProductRequest.title = this.getFormControls.title.value;
      editProductRequest.imageLocation = this.imageLocation;
      editProductRequest.price = this.getFormControls.price.value;
      editProductRequest.stock = this.getFormControls.stock.value;
      editProductRequest.categoryNames = this.getFormControls.categories.value;

      this.productService.editProduct(editProductRequest, this.id)
        .subscribe(productData => {
          this.loading = false;
          this.newProduct = productData;
          this.alertService.openSnackBar('Product added successfully', false);
          this.dialogRef.close(true);
        }, error21 => {
          this.alertService.openSnackBar('Failed to add the product!', true);
          this.dialogRef.close(false);
        });
    }
  }
}
