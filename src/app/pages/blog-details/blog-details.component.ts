import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { url } from '../../constant/constants';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  urlLink: any = '';
  categoryUrl: any = '';
  nameUrl: any = '';

  heading: any;
  info: any;
  category: any;
  recent: any;
  detailsArray: any;

  data = false;

  constructor(private activateRoute: ActivatedRoute,
              private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.categoryUrl = this.activateRoute.snapshot.paramMap.get('blogcategory');
    this.nameUrl = this.activateRoute.snapshot.paramMap.get('name');
    this.activateRoute.params.subscribe(
      (params: Params) => {
        this.categoryUrl = this.activateRoute.snapshot.paramMap.get('blogcategory');
        this.nameUrl = this.activateRoute.snapshot.paramMap.get('name');
        this.getBlogDetails();
        console.log('before : ' + this.urlLink);
      }
      );
  }

  getBlogDetails() {
    const promise = new Promise((resolve, response) => {
      this.http.get(url + 'view/controller.php?action=getblogdetails&url=' + this.nameUrl).toPromise()
      .then((data) => {
        this.data = true;
        this.heading = data[0].heading;
        this.info = data[1].info[0];
        this.detailsArray = data[1].info;
        this.category = data[2].category;
        this.recent = data[3].recent;
      })
      .catch((err) => {
        console.log(err);
      });
    });
  }

}
