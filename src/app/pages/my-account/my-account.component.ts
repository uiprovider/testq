import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


import { url } from '../../constant/constants';
import { validateAllFormFields } from '../../constant/formvalidation';
import { from, Subject } from 'rxjs';
import { Router } from '@angular/router';

export let loginEmitter = new Subject<any>();

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})

export class MyAccountComponent implements OnInit {
  validation = false;
  validationMsg: any;
  states: any;
  loginForm: FormGroup;
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
    ) { }

  ngOnInit() {
    this.getStates();
    if (localStorage.getItem('user')) {
      loginEmitter.next(true);
    } else {
      loginEmitter.next(false);
    }

    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    }) ;

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      phonenno: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      // address: ['', Validators.required],
      // state: ['', Validators.required],
      // pincode: ['', Validators.required]
    }) ;
  }

  get name() {
    return this.loginForm.get('name');
  }
  get password() {
    return this.loginForm.get('password');
  }



  get regname() {
    return this.registerForm.get('name');
  }
  get regphoneno() {
    return this.registerForm.get('phonenno');
  }
  get regpassword() {
    return this.registerForm.get('password');
  }
  get regemail() {
    return this.registerForm.get('email');
  }
  get regaddress() {
    return this.registerForm.get('address');
  }
  get regstate() {
    return this.registerForm.get('state');
  }
  get regpincode() {
    return this.registerForm.get('pincode');
  }


  login() {
    if (this.loginForm.valid) {
      const promise = new Promise((resolve, response) => {
        this.http.get(url + 'view/controller.php?action=login&username='
        + this.loginForm.value.name
        + '&password='
        + this.loginForm.value.password)
        .toPromise()
        .then((data) => {
          localStorage.setItem('user', JSON.stringify(data));
          this.validationMsg = data;
          this.validation = true;
          console.log('this.validationMsg');
          console.log(this.validationMsg);
          if (this.validationMsg.error === 0 || this.validationMsg.error === '0') {
            loginEmitter.next(true);
            this.router.navigate(['/my-orders']);
          } else {
            loginEmitter.next(false);
          }
          setTimeout(() => {
            this.validation = false;
          }, 5000);
        })
        .catch((err) => {
          console.log(err);
        });
      });
      return promise;
      console.log(this.loginForm.value);
    } else {
      validateAllFormFields(this.loginForm);
    }
  }

  saveReistration() {
    if (this.registerForm.valid) {
      const promise = new Promise((resolve, response) => {
        this.http.post(url + 'view/controller.php?action=register', this.registerForm.value)
        .toPromise()
        .then((data) => {
          localStorage.setItem('user', JSON.stringify(data));
          this.validationMsg = data;
          // console.log('this.validationMsg');
          // console.log(this.validationMsg);
          this.validation = true;
          setTimeout(() => {
            this.validation = false;
          }, 5000);
          if (localStorage.getItem('user')) {
            loginEmitter.next(true);
          } else {
            loginEmitter.next(false);
          }
          if (this.validationMsg.err === 1 || this.validationMsg.err === '1') {
            this.router.navigate(['/my-orders']);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      });
      return promise;
      console.log(this.loginForm.value);
    } else {
      validateAllFormFields(this.registerForm);
    }
    console.log(this.registerForm.value);
  }
  getStates() {
    this.http.get(url + 'view/controller.php?action=getstate')
    .toPromise()
    .then((data) => {
      this.states = data;
    });
   }

}
