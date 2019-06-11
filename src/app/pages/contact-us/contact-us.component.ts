import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


import { url } from '../../constant/constants';
import { validateAllFormFields } from '../../constant/formvalidation';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactUsContent: any;
  validation = false;
  validationMsg: any;

  contactUs: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    // this.contactUs = new FormGroup({
    //   firstName: new FormControl(''),
    //   email: new FormControl(''),
    //   phoneNumber: new FormControl(''),
    //   message: new FormControl('')
    // });
    this.contactUs = this.fb.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(10), Validators.maxLength(10)]],
      message: ['', Validators.required]
    }
    );
    this.getContactUsText();
  }

  get firstName() {
    return this.contactUs.get('firstName');
  }
  get email() {
    return this.contactUs.get('email');
  }
  get phoneNumber() {
    return this.contactUs.get('phoneNumber');
  }
  get message() {
    return this.contactUs.get('message');
  }
  saveContact() {
      if (this.contactUs.valid) {
        const promise = new Promise((resolve, response) => {
          this.http.get(url + 'view/controller.php?action=postcontactinfo&email='
          + this.contactUs.value.email + '&firstName=' + this.contactUs.value.firstName
          + '&message=' + this.contactUs.value.message
          + '&phoneNumber=' + this.contactUs.value.phoneNumber)
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
        console.log(this.contactUs.value);
      } else {
        validateAllFormFields(this.contactUs);
      }
    }

    getContactUsText() {
      const promise = new Promise((request, response) => {
        this.http.get(url + 'view/controller.php?action=getpages&url=contact-us').toPromise()
        .then((data) => {
          this.contactUsContent = data;
        })
        .catch((err) => {
          console.log(err);
        });
      });
    }

}
