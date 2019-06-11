import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { validateAllFormFields } from '../../constant/formvalidation';
import { url } from '../../constant/constants';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent  implements OnInit {
  states: any = [];
  bookInformation: any[] = [
    'Library',
    'Individual',
    'Resellers'
  ];
  validation = false;
  validationMsg: any;

  bulkBuyers: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.bulkBuyers = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      emaiId: ['', Validators.required],
      phoneNo: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(10), Validators.maxLength(10)]],
      city: ['', Validators.required],
      state: ['Tamil Nadu', Validators.required],
      bookInfo: ['Author'],
      orderValue: [''],
      noOfBooks: ['', Validators.required],
      comment: ['']
    });
    window.scrollTo(0, 0);
    this.getStates();
  }
  get firstName() {
    return this.bulkBuyers.get('firstName');
  }
  get emaiId() {
    return this.bulkBuyers.get('emaiId');
  }
  get phoneNo() {
    return this.bulkBuyers.get('phoneNo');
  }
  get city() {
    return this.bulkBuyers.get('city');
  }
  get state() {
    return this.bulkBuyers.get('state');
  }
  get noOfBooks() {
    return this.bulkBuyers.get('noOfBooks');
  }
  getStates() {
    this.http.get(url + 'view/controller.php?action=getstate')
    .toPromise()
    .then((data) => {
      this.states = data;
    });
   }
  blkBuyers() {
    if (this.bulkBuyers.valid) {
      const promise = new Promise((resolve, response) => {
        this.http.post('http://momandkidsbooks.com/view/controller.php?action=postbulkbuyers', this.bulkBuyers.value)
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
      console.log(this.bulkBuyers.value);
    } else {
      validateAllFormFields(this.bulkBuyers);
    }
  }
}
