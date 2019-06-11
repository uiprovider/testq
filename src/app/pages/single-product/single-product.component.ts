import { Component, OnInit,  Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/interface/book';
import { BookService } from 'src/app/services/book.service';
import { MenuService } from 'src/app/services/menu.service';
import { from, Subject } from 'rxjs';

export let cartEmitter = new Subject<any>();

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  @ViewChild('imageRef') imageRef: ElementRef; 
  menulist: any[] = [];
  rate: any = 1;
  singleBook: any;
  total: any;
  urlLink: any = '';
  getBooks: any[] = [];
  getBook: any;
  getBookImages: any;
  singleBookCategory: any;
  uniqueId: any;

  category: any = [];

  constructor(public router: ActivatedRoute,
    private route: Router,
    public bookService: BookService,
    private menu: MenuService) { }
  ngOnInit() {
    // console.log('Single Books');
    this.uniqueId = this.router.snapshot.paramMap.get('uniqueId');
    this.menu.getMenus()
    .subscribe(result => {
      this.menulist = result;
      this.getSingleBook();
    });
    this.loadScript('assets/js/active.js');
  }
  public loadScript(url) {
    console.log('preparing to load...');
    const node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
 }
  getSingleBook(): void {
    this.bookService.getSingleBooks(this.uniqueId).subscribe(response => {
      this.singleBookCategory = response[0].list[0];
      this.getBook = response[0].list[0];
      this.getBookImages = response[1].images;

      for (const i of this.menulist) {
        if (i.menuLink.includes(this.singleBookCategory.right_side)) {
          console.log('menu.submenu');
          this.category = i.submenu;
        }
      }
      console.log(this.category);
      if (this.singleBookCategory.uniqueId.includes(this.uniqueId)) {
        this.total = this.singleBookCategory.newPrice;
        this.singleBook = this.singleBookCategory.newPrice;
      }
    });
  }

  changeRate(): void {
    this.total = this.rate * this.singleBook;
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
  getSavedAmount(newPrice: any, oldPrice: any){
    let value = this.rate * (oldPrice - newPrice);
    return 'You saved <i class="fa fa-inr"></i>' +  value;
  }
  changeImg(data: any) {
    console.log(this.imageRef.nativeElement);
    console.log(data);
    this.imageRef.nativeElement.src = data.image;
  }
}
