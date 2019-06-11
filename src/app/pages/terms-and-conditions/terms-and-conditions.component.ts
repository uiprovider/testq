import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from 'src/app/constant/constants';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit {
  termsAndConditions: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getContactUsText();
  }
  getContactUsText() {
    const promise = new Promise((request, response) => {
      this.http.get(url + 'view/controller.php?action=getpages&url=terms-and-conditions').toPromise()
      .then((data) => {
        this.termsAndConditions = data;
      })
      .catch((err) => {
        console.log(err);
      });
    });
  }

}
