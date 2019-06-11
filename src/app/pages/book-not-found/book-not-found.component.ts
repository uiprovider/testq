import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { url } from '../../constant/constants';
import { validateAllFormFields } from '../../constant/formvalidation';

@Component({
  selector: 'app-book-not-found',
  templateUrl: './book-not-found.component.html',
  styleUrls: ['./book-not-found.component.css']
})
export class BookNotFoundComponent implements OnInit {
  validation = false;
  validationMsg: any;
  bookNotFound: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.bookNotFound = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      requiredBooks: ['', Validators.required]
    }) ;
  }

  get name() {
    return this.bookNotFound.get('name');
  }
  get email() {
    return this.bookNotFound.get('email');
  }
  get city() {
    return this.bookNotFound.get('city');
  }
  get state() {
    return this.bookNotFound.get('state');
  }
  get requiredBooks() {
    return this.bookNotFound.get('requiredBooks');
  }

  getBookNotFound(): void {
      if (this.bookNotFound.valid) {
        const promise = new Promise((resolve, response) => {
          this.http.get(url + 'view/controller.php?action=postbooknotfound'
          + '&email=' + this.bookNotFound.value.email
          + '&name=' + this.bookNotFound.value.name
          + '&reqBooks=' + this.bookNotFound.value.requiredBooks
          + '&city=' + this.bookNotFound.value.city
          + '&state=' + this.bookNotFound.value.state)
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
        console.log(this.bookNotFound.value);
      } else {
        validateAllFormFields(this.bookNotFound);
      }
  }
}
