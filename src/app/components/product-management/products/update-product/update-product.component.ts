import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {FormComponentBase} from 'src/app/classes/form-component-base';
import {Product} from 'src/app/models/product';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from 'src/app/services/product.service';
import {ProductCategory} from 'src/app/models/product-category';
import {ErrorHandlerService} from '../../../../services/error-handler.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent extends FormComponentBase implements OnInit, AfterViewInit {
  product: Product;
  id: string;
  updateSuccess: boolean;
  @ViewChild('name') firstItem: ElementRef;
  productCategory;
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private productService: ProductService, private router: Router,
              private errorHandlerService: ErrorHandlerService) {
    super();
    this.validationMessages = {
      productId: {
      },
      productName: {
        required: 'Required',
        maxlength: 'Id maximum length is 10.',
        pattern: 'Alphanumeric at start and end only with hyphen,underscores and space in between.'
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
      productId: '',
      productName: '',
      productPrice: '',
      productColor: '',
      productCategory: '',
      productQuantity: '',
      productSpecification: ''
    };
  }


  ngOnInit(): void {
    if ((!!sessionStorage.getItem('userId')) && (sessionStorage.getItem('userRole') === 'PRODUCT_MASTER')) {
      this.productCategory = ProductCategory;

      this.productForm = this.fb.group({
        productId: [''],
        productName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+(?:[\w -]*[a-zA-Z0-9]+)*$')]],
        productPrice: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*')]],
        productColor: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
        productCategory: ['', [Validators.required]],
        productQuantity: ['', [Validators.required, Validators.pattern('[1-9][0-9]*')]],
        productSpecification: ['', [Validators.required]],
      });

      this.getProductById();

    }

  }

  getProductById() {

    this.id = this.route.snapshot.params.id;
    this.productService.getProduct(this.id)
      .subscribe(data => {
        this.product = data;
        this.productForm.setValue(this.product);
      }, error => this.errorHandlerService.handleError(error));
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.firstItem.nativeElement.focus();
    }, 250);
    this.startControlMonitoring(this.productForm);
  }

  onSubmit(value: any) {
    console.log(this.productForm.value);
    this.productService.updateProduct(this.productForm.value, this.id)
      .subscribe(data => {
        console.log(data);
        this.updateSuccess = true;
        setTimeout(() => this.updateSuccess = false, 3000);
       /* alert('Product updated successfully!');
        this.router.navigate(['view-product']);*/
      }, error => console.log(error));


  }

}
