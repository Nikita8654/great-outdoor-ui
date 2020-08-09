import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ProductService} from 'src/app/services/product.service';
import {ProductCategory} from 'src/app/models/product-category';
import {Product} from 'src/app/models/product';
import {FormComponentBase} from 'src/app/classes/form-component-base';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent extends FormComponentBase implements OnInit, AfterViewInit {

  @ViewChild('name') firstItem: ElementRef;
  productCategory;
  addedSuccess: boolean;
  productForm: FormGroup;
  updateSuccess: boolean;

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router) {
    super();
    this.validationMessages = {
      productName: {
        required: 'Required',
        maxlength: 'Id maximum length is 10.',
        pattern: 'Alphanumeric at start and end only. Hyphen,underscores and space in between.'
      },
      productPrice: {
        required: 'Required',
        pattern: 'Enter valid price.'
      },
      productColor: {
        required: 'Required',
        pattern: 'Enter valid color.'
      },
      productCategory: {
        required: 'Required',
      },
      productQuantity: {
        required: 'Required',
        pattern: 'Valid product quantity.'
      },
      productSpecification: {
        required: 'Required',
      },

    };
    this.formErrors = {
      productName: '',
      productPrice: '',
      productColor: '',
      productCategory: '',
      productQuantity: '',
      productSpecification: ''
    };
  }

  ngOnInit(): void {
    this.productCategory = ProductCategory;

    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+(?:[\w -]*[a-zA-Z0-9]+)*$')]],
      productPrice: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*')]],
      productColor: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      productCategory: ['', [Validators.required]],
      productQuantity: ['', [Validators.required, Validators.pattern('[1-9][0-9]*')]],
      productSpecification: ['', [Validators.required]],
    });
  }

  onSubmit(value: Product) {
    this.productService.addProduct(this.productForm.value).subscribe(data =>{
        this.updateSuccess = true;
        setTimeout(() => this.updateSuccess = false, 3000); },
      error => console.log(error),
      () => {
        /*alert('Product added successfully!');
        this.router.navigate(['view-product']);*/
      });

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.firstItem.nativeElement.focus();
    }, 250);
    this.startControlMonitoring(this.productForm);
  }

}
