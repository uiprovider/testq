import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from '../../constant/constants';
import { reject } from 'q';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {

  heading: any = null;
  categoryList: any[] = [];
  infoList: any[] = [];
  recentList: any[] = [];
  url: any = url + 'view/controller.php?action=getblog';
  // url: any = '/assets/json/blog.json';
  getCategory: any = '';

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getCategory = this.activateRoute.snapshot.paramMap.get('blogcategory');
    this.activateRoute.params.subscribe(
      (params: Params) => {
        this.getCategory = this.activateRoute.snapshot.paramMap.get('blogcategory');
        this.getBlogCategory();
      }
    );
    if (!this.getCategory) {
      console.log('getBlog called');
      this.getBlog();
    } else {
      console.log('getBlog Category called');
      this.getBlogCategory();
    }
  }
  ngOnDestroy() {
    this.getCategory = null;
  }
  getBlog(): Promise<any> {
    const promise = new Promise((resolve, response) => {
      this.http.get(this.url + '').toPromise()
      .then((data) => {
        this.heading = data[0].heading;
        this.categoryList = data[1].info;
        this.infoList = data[2].category;
        this.recentList = data[3].recent;
        console.log('heading : ' + this.heading);
        console.log(this.categoryList);
      })
      .catch((err) => {
        console.log('Due to issue unable to get : ' + err.message);
      });
    });
    return promise;
  }
  getBlogCategory() {
    const promise = new Promise((resolve, response) => {
      this.http.get(this.url + '&cat_url=' + this.getCategory + '&page=1')
      .toPromise()
      .then((data) => {
        this.heading = data[0].heading;
        this.categoryList = data[1].info;
        this.infoList = data[2].category;
        this.recentList = data[3].recent;
      })
      .catch((err) => {
        console.log('Error' + err);
      });
    });
    promise.catch(function(error) {
      console.log(error);
    });
    return promise;
  }

}
