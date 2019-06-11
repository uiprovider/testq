import { Component, OnInit, Input, OnChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterEvent, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/interface/book';
import { NewarrivalsComponent } from 'src/app/pages/newarrivals/newarrivals.component';
import { cartEmitter } from '../../pages/single-product/single-product.component'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnChanges, OnDestroy {
  @Output() sort = new EventEmitter();
  @Output() pageNo = new EventEmitter();
  @Output() product_per_page = new EventEmitter();
  selectBoxValue: any = [
    {key: 1, value: 'Low to high'},
    {key: 2, value: 'price high to low)'},
    {key: 3, value: 'accending order product name'},
    {key: 4, value: 'decending product name'},
    {key: 5, value: 'old'},
    {key: 6, value: 'new'}
  ]
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
    this.activeRoute.url.pipe(map(segments => segments.join('/'))).subscribe((data) => {
      console.log(data);
      this.actRoute = data;
      this.getBooks();
    })
  }
  getBooks(): void {
    this.bookService.getBooks(`/${this.actRoute}`).subscribe(response => {
      console.log(response);
      this.books = response[0].list;
      this.paging = response[1].paging[0];
      console.log(this.books);
    });
  }
  ngOnChanges() {
    console.log('ngOnChanges() working well' + this.urlLink);
    // this.getBooks();
    // this.doSomething(changes.categoryId.currentValue);
    // You can also use categoryId.previousValue and
    // categoryId.firstChange for comparing old and new values

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
    cartEmitter.next(true);
    alert(book.name + 'added successfully to the cart');
  }
  onChange(value: any) {
    this.sort.next('&sort=' + value);
    // this.getBooks();
  }
  choosePage(pages: any) {
    this.pageNo.next('&page_no=' + pages);
  }
  productPerPage(pages: any) {
    this.product_per_page.next('&product_per_page=' + pages);
  }
  choosePrevious(pages: any) {
    let pag = +pages - 1;
    this.pageNo.next('&product_per_page=' + pag);
    console.log(pages);
  }
  chooseNext(pages: any) {
    let pag = +pages + 1;
    this.pageNo.next('&product_per_page=' + pag);
    console.log(pages);
  }
  ngOnDestroy() {
    // this.activeRoute.url.unsubscribe();
  }
}
