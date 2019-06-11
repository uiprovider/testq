import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { url } from '../../constant/constants';
import { validateAllFormFields } from '../../constant/formvalidation';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  states: any = [];
  differentAddr = false;
  validation = false;
  validationMsg: any;

  carts: any;
  totalAmount: any;

  encRequest: any;
  accessCode: any;
  action: any;
  @ViewChild('form') form: ElementRef;


  user = JSON.parse(localStorage.getItem('user'));
  checkOutForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    if(this.user){
      this.setEditProfileForm();
    }
    this.carts = JSON.parse(sessionStorage.getItem('cart'));
    this.getStates();
    this.getTotal();
    this.checkOutForm = this.fb.group({
      fname: ['', Validators.required],
      lname: [''],
      // company: ['', Validators.required],
      email: ['', Validators.required],
      password: [''],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
      state: ['Tamil Nadu', Validators.required],
      zip: ['', Validators.required],
      shippingName: [''],
      shippingPhone: [''],
      shippingDistrict: [''],
      shippingCity: [''],
      shippingState: ['Tamil Nadu'],
      shippingZip: [''],
      differentAddress: ['']
    });
  }

  setEditProfileForm() {
    if (this.states) {
      const promise = new Promise((resolve, response) => {
        this.http.get(url + 'view/controller.php?action=profile')
        .toPromise()
        .then((data) => {
          let values = data[0];
          this.checkOutForm.patchValue({
            fname: values.fname,
            lname: values.lname,
            // company: values.company_name,
            phone: values.phone,
            email: values.email,
            address: values.address,
            district: values.town,
            city: values.city,
            zip: values.pincode,
            state: values.state
          });
        })
        .catch((err) => {
          console.log(err);
        });
      });
    }
  }

  getTotal() {
    let total = 0;
    for (const i of this.carts) {
      total = total + i.total;
    }
    this.totalAmount = total;
   }

  get fname() {
    return this.checkOutForm.get('fname');
  }
  get lname() {
    return this.checkOutForm.get('lname');
  }
  // get company() {
  //   return this.checkOutForm.get('company');
  // }
  get email() {
    return this.checkOutForm.get('email');
  }
  get password() {
    return this.checkOutForm.get('password');
  }
  get phone() {
    return this.checkOutForm.get('phone');
  }
  get address() {
    return this.checkOutForm.get('address');
  }
  get district() {
    return this.checkOutForm.get('district');
  }
  get city() {
    return this.checkOutForm.get('city');
  }
  get zip() {
    return this.checkOutForm.get('zip');
  }
  get dAddress() {
    return this.checkOutForm.get('differentAddress');
  }
  get state() {
    return this.checkOutForm.get('state');
  }
 getStates() {
  this.http.get(url + 'view/controller.php?action=getstate')
  .toPromise()
  .then((data) => {
    this.states = data;
  });
 }
  checkout() {
    if (this.checkOutForm.valid) {
      const full = this.checkOutForm.value;
      full.cartInfo = JSON.parse(sessionStorage.getItem('cart'));
      full.totalAmount = this.totalAmount;
      console.log('Valid');
      const promise = new Promise((resolve, response) => {
        this.http.post(url + 'view/controller.php?action=checkout', full)
        .toPromise()
        .then((data) => {
          localStorage.setItem('user', JSON.stringify(data));
          this.validationMsg = data;
          this.validation = true;
          this.encRequest = this.validationMsg.encRequest;
          this.accessCode = this.validationMsg.access_code;
          this.action = this.validationMsg.redirect_url;
          setTimeout(() => {
            this.form.nativeElement.submit();
          }, 1000);
          setTimeout(() => {
            this.validation = false;
          }, 5000);
        })
        .catch((err) => {
          console.log(err);
        });
      });
      console.log(this.checkOutForm.value);
    } else {
      validateAllFormFields(this.checkOutForm);
      console.log('In Valid');
    }
  }

}
