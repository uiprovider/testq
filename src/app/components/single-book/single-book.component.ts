import { Component, OnInit,  Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/interface/book';
import { BookService } from 'src/app/services/book.service';
import { MenuService } from 'src/app/services/menu.service';
import { from, Subject } from 'rxjs';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {
  rate: any = 1;
  // @Input() singlebook: Book;
  @Input() urlLink: any;
  actRoute: any;
  // sort: any = '';
  bookModal: Book;
  @Input() paging: any = null;
  @Input() books: any[] = [];
  constructor(public bookService: BookService,
    private router: Router, private activeRoute: ActivatedRoute) {
   }
  slidervalue: any = 50;
  ngOnInit() {
      this.getBooks();
  }
  getBooks(): void {
    this.bookService.getBooks(`/${this.urlLink}`).subscribe(response => {
      console.log(response);
      this.books = response[0].list;
      this.paging = response[1].paging[0];
      console.log(this.books);
    });
  }
singleProductView(url: any) {
  console.log('bookcomponent url : ' + this.router.url);
  this.bookService.getproductUrl = this.router.url;
  this.router.navigate(['product-details/' + url]);
}
  valueofslider(value: any): void {
    // console.log('Changing' + value);
    this.slidervalue = value;
  }
  getBookModal(book: Book): void {
    this.bookModal = book;
    console.log(this.bookModal);
  }
  addToCart(book: any): void {
    let same = false;
    const cartinfo = JSON.parse(sessionStorage.getItem('cart'));
    if (cartinfo.length > 0) {
      for (const i of cartinfo) {
        if (i.uniqueId === book.uniqueId) {
          same = true;
          i.quantity = i.quantity + this.rate;
          i.total = i.quantity * parseInt(book.newPrice, 10);
        }
      }
      if (same === false) {
        book.quantity = this.rate;
        book.total = this.rate * parseInt(book.newPrice, 10);
        cartinfo.push(book);
      }
    } else {
      book.quantity = this.rate;
      book.total = parseInt(book.newPrice, 10) * this.rate;
      cartinfo.push(book);
      sessionStorage.setItem('cart', JSON.stringify(cartinfo));
    }
    sessionStorage.setItem('cart', JSON.stringify(cartinfo));
    alert(book.name + 'added successfully to the cart');
  }
}
