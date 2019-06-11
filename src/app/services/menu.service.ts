import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from '../constant/constants';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  url: any = url + 'view/controller.php?action=getmainmenu';
  // url: any = 'view/controller.php?action=getmainmenu';
  menu: any[] = [];
  constructor(private http: HttpClient, private route: Router) { }
  getMenus(): any {
    return this.http.get<any[]>(this.url)
    .pipe();
  }
  getdynCategory(): any {
    return this.http.get<any[]>(this.url)
    .pipe();
  }
}
