import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {FormComponentBase} from 'src/app/classes/form-component-base';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CrossFieldErrorMatcher} from 'src/app/classes/cross-field-error-matcher';
import {UserService} from 'src/app/services/user.service';
import {passwordsDoNotMatch} from 'src/app/classes/passwords-do-not-match.validator';
import {User} from 'src/app/models/user';
import {ProductMaster} from 'src/app/models/product-master';

@Component({
  selector: 'app-add-product-master',
  templateUrl: './add-product-master.component.html',
  styleUrls: ['./add-product-master.component.css']
})
export class AddProductMasterComponent extends FormComponentBase implements OnInit, AfterViewInit {

  @ViewChild('email') firstItem: ElementRef;
  form!: FormGroup;
  hidePassword = true;
  errorMatcher = new CrossFieldErrorMatcher();
  success: boolean;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    super();

    this.validationMessages = {
      email: {
        required: 'Email is required.',
        pattern: 'Enter valid email Id.',
      },
      userId: {
        required: 'User id is required.',
        minlength: 'User id minimum length is 6.',
        maxlength: 'User id maximum length is 15.',
        pattern: ' Allowed characters letters, numbers only. No spaces.'
      },
      password: {
        required: 'Password is required.',
        minlength: 'Password minimum length is 6.',
        maxlength: 'Password maximum length is 15.',
        pattern: 'Password minimum length 6, requires one letter, one number, one special character !@#$%^&* no spaces.'
      },
      confirmPassword: {
        required: 'Confirm password is required.',
        minlength: 'Confirm password minimum length is 6.',
        maxlength: 'Confirm password maximum length is 15.',
        pattern: 'Confirm password minimum length 6, requires one letter, one number, one special character !@#$%^&* no spaces.',
        passwordsDoNotMatch: 'Passwords must match.'
      },

      passwordsGroup: {
        passwordsDoNotMatch: 'Passwords must match.'
      },
      phoneNo: {
        required: 'phone number is required.',
        pattern: 'Valid Phone No. is required.'
      }
    };

    this.formErrors = {
      email: '',
      userId: '',
      password: '',
      confirmPassword: '',
      passwordsGroup: '',
      phoneNo: '',
    };
  }

  ngOnInit(): void {

    if (sessionStorage.getItem('userRole') === 'ADMIN') {
      this.form = this.formBuilder.group({
        email: ['', [
          Validators.required,
          Validators.pattern('^\\w+[\\w-\\._]*\\@[a-zA-Z]*.[a-z]{2,3}$'),
        Validators.email]],
        userId: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
          Validators.pattern('^[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9]*$')]],
        phoneNo: ['', [Validators.required,
          Validators.pattern('^[7-9][0-9]{9}$')]],
        passwordsGroup: this.formBuilder.group({
          password: ['', [
            Validators.required,
            Validators.maxLength(15),
            Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$')]],


          confirmPassword: ['', [
            Validators.required,
            Validators.maxLength(15),
            Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$')]],
        }, {validators: passwordsDoNotMatch})
      });

    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.firstItem.nativeElement.focus();
    }, 250);
    this.startControlMonitoring(this.form);
  }

  registerClicked(value: User) {
    console.log(this.form.value);
    const getPassword = this.form.get(['passwordsGroup', 'password']).value;
    const getEmail = this.form.get('email').value;
    const getUserId = this.form.get('userId').value;
    const getPhoneNo = this.form.get('phoneNo').value;
    const user: User = {
      userId: getUserId,
      password: getPassword,
      phoneNo: getPhoneNo,
      email: getEmail,
      loginToken: '',
      userRole: 'PRODUCT_MASTER'
    };
    this.userService.addUser(user).subscribe((data) => {
      this.success = true;
      setTimeout(() => this.success = false, 3000);
    }, (error) => {
      alert('Error during adding product master');
    });

    this.form.reset();
  }


}
