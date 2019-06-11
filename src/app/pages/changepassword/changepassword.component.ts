import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateAllFormFields } from '../../constant/formvalidation';
import { Router } from '@angular/router';
import { url } from '../../constant/constants';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  validation = false;
  validationMsg: any;
  forgetPasswordForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private http:HttpClient) { }

  ngOnInit() {
    this.checkLogin();
    this.forgetPasswordForm = this.fb.group({
      oldPass: ['', Validators.required],
      newPass: ['', Validators.required],
      reenterNewPass: ['', Validators.required]
    });
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

  get oldPass() {
    return this.forgetPasswordForm.get('oldPass');
  }
  get reenterOldPass() {
    return this.forgetPasswordForm.get('reenterOldPass');
  }
  get newPass() {
    return this.forgetPasswordForm.get('newPass');
  }

  forgetPassword() {
    if (this.forgetPasswordForm.valid) {
      const full = this.forgetPasswordForm.value;
      // full.cartInfo = JSON.parse(sessionStorage.getItem('cart'));
      console.log('Valid');
      const promise = new Promise((resolve, response) => {
        this.http.get(url + 
          `view/controller.php?action=changepassword&oldpassword=${full.oldPass}&confirmnew=${full.reenterNewPass}&newpassword=${full.newPass}`)
        .toPromise()
        .then((data) => {
          // localStorage.setItem('user', JSON.stringify(data));
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
      console.log(this.forgetPasswordForm.value);
    } else {
      validateAllFormFields(this.forgetPasswordForm);
      console.log('In Valid');
    }
  }

}
