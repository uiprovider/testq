import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../interface/book';
import { from, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { BookComponent } from '../components/book/book.component';
import { Router } from '@angular/router';
import { url } from '../constant/constants';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  // read : URL + 'momandbaby/assets/json/books.json',
  CRUD = {
    create : URL + 'leadDetailsList',
    read : URL + 'view/controller.php?action=getproductlist',
    update : URL + 'leadDetailsUpdate',
    delete : URL + 'leadDetailsDelete'
  };

  // url: any = 'view/controller.php?action=getproductlist';
  url: any = url + 'view/controller.php?action=getproductlist';
  singleproducturl: any = url + 'view/controller.php?action=getproductdetails';

  getproductUrl: any = '';

  listOfBooks: Book[] = [];
  constructor(private http: HttpClient, private route: Router) { }
  getBooks(urlLink: any) {
    return this.http.get<any[]>(this.url + '&url=' + urlLink).pipe(
      // return this.http.get<Book[]>(urlLink).pipe(
      tap(list => this.listOfBooks = list)
    );
  }

  getSingleBooks(urlLink: any) {
    return this.http.get<any[]>(this.singleproducturl + '&url=' + urlLink).pipe(
      // return this.http.get<Book[]>(urlLink).pipe(
      tap(list => this.listOfBooks = list)
    );
  }

  // getFilterWorking() {
  //   from(this.listOfBooks).pipe(
  //     filter(res => res[0].uniqueId === 1)
  //   );
  // }

  getSingleBook(uniqueId: number) {
    // return this.http.get<Book[]>(this.CRUD.read).pipe(
    //   filter(book => book[0].uniqueId === uniqueId),
    //   map(result => result[0])
    // );


    return from(this.listOfBooks).pipe(filter(book => book.uniqueId === uniqueId));

    // return this.http.get<Book[]>(this.CRUD.read)
    // .pipe(
    //   filter(book => book.uniqueId === uniqueId),
    //   map()
    // );


    // return this.http.get<Book>(this.CRUD.read).pipe(
    //   filter(book => {
    //     book.uniqueId === uniqueId;
    //     console.log(uniqueId);
    //   })
    //   );
  }
}
