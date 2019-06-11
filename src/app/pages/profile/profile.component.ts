import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { url } from '../../constant/constants';
import { validateAllFormFields } from '../../constant/formvalidation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  validation = false;
  validationMsg: any;
  states: any = [];
  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) { }
  editProfile: FormGroup;
  ngOnInit() {
    this.checkLogin();
    this.getStates();
    console.log(this.states);
    this.editProfile = this.fb.group({
      fname: ['', Validators.required],
      lname: [''],
      companyName: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      town: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    });
    this.setEditProfileForm();
  }
  checkLogin() {
    if (!localStorage.getItem('user')) {
      this.router.navigate(['/myaccount']);
    } else {
      const lc: any = JSON.parse(localStorage.getItem('user'));
      if (lc.error === 1 || lc.error === '1') {
        this.router.navigate(['/myaccount']);
      }
    }
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/myaccount']);
    this.ngOnInit();
  }

  setEditProfileForm() {
    if (this.states) {
      const promise = new Promise((resolve, response) => {
        this.http.get(url + 'view/controller.php?action=profile')
        .toPromise()
        .then((data) => {
          let values = data[0];
          this.editProfile.patchValue({
            fname: values.fname,
            lname: values.lname,
            companyName: values.company_name,
            phone: values.phone,
            address: values.address,
            town: values.town,
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

  get fname() {
    return this.editProfile.get('fname');
  }
  get lname() {
    return this.editProfile.get('lname');
  }
  get fnacompanyNameme() {
    return this.editProfile.get('companyName');
  }
  // get email() {
  //   return this.editProfile.get('email');
  // }
  get phone() {
    return this.editProfile.get('phone');
  }
  get address() {
    return this.editProfile.get('address');
  }
  get town() {
    return this.editProfile.get('town');
  }
  get city() {
    return this.editProfile.get('city');
  }
  get state() {
    return this.editProfile.get('state');
  }
  get zip() {
    return this.editProfile.get('zip');
  }


  editProfileForm() {
    if (this.editProfile.valid) {
      const full = this.editProfile.value;
      const promise = new Promise((resolve, response) => {
        this.http.get(url + 
          `view/controller.php?action=editprofile&fname=${full.fname}&lname=${full.lname}&email=${full.email}&phone=${full.phone}&address=${full.address}&state=${full.state}&city=${full.city}&pincode=${full.pincode}&district=${full.district}&company_name=${full.companyName}`)
        .toPromise()
        .then((data) => {
          this.validationMsg = data;
          this.validation = true;
          setTimeout(() => {
            this.validation = false;
          }, 5000);
        })
        .catch((err) => {
          console.log(err);
        });
      });
      console.log(this.editProfile.value);
    } else {
      validateAllFormFields(this.editProfile);
      console.log('In Valid');
    }
    console.log(this.editProfile);
  }
  getStates() {
    this.http.get(url + 'view/controller.php?action=getstate')
    .toPromise()
    .then((data) => {
      this.states = data;
    });
   }
}
