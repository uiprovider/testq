import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/interface/book';
import { MenuService } from 'src/app/services/menu.service';
import { Options, LabelType  } from 'ng5-slider';

@Component({
  selector: 'app-new-books',
  templateUrl: './new-books.component.html',
  styleUrls: ['./new-books.component.css']
})
export class NewBooksComponent implements OnInit, OnChanges {
  minValue: number = 100;
  maxValue: number = 400;
  options: Options = {
    floor: 0,
    ceil: 1000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> Rs.' + value;
        case LabelType.High:
          return '<b>Max price:</b> Rs.' + value;
        default:
          return 'Rs.' + value;
      }
    }
  };

  filter: any = '';
  sort: any = '';
  pageNo: any = '';
  product_per_page: any = '';

  dynamicCategory: any;
  menulist: any[] = [];
  getBooks: Book[] = [];
  pagings: any;
  sub:  any;
  filtername: any;
  urlLink: any = '';
  constructor(
    private router: ActivatedRoute,
    public bookService: BookService,
    private route: Router,
    private menu: MenuService) { }

  ngOnInit() {
    this.getSingleBook();
    // this.category = + this.router.snapshot.paramMap.get('category');
    this.sub = + this.router.snapshot.paramMap.get('sub');
    this.filtername = + this.router.snapshot.paramMap.get('filtername');
    console.log('new-books routin url : ' + this.route.url);
    this.urlLink = this.route.url;
    if (this.urlLink.indexOf('/') === 0) {
      this.urlLink = this.urlLink.slice(1);
    }
    // this.router.params.subscribe(
    //   (params: Params) => {
    //     console.log('before : ' + this.urlLink);
    //     let beforeURL;
    //     if (this.urlLink.indexOf('/') === 0) {
    //       this.urlLink = this.urlLink.slice(1);
    //       beforeURL = this.urlLink.substr(0, this.urlLink.indexOf('/'));
    //     } else {
    //       beforeURL = this.urlLink.substr(0, this.urlLink.indexOf('/'));
    //     }
    //     console.log('after crop : ' + beforeURL);
    //     this.urlLink = this.route.url.substr(0, this.route.url.indexOf('/')) + '/' + params['sub'] + '/' + params['filtername'];
    //     console.log(beforeURL + this.urlLink);
    //     this.getSingleBook();
    //   }
    //   );

    this.getDynCategory();

      this.loadScript('assets/js/active.js');
  }
  ngOnChanges() {
    console.log(this.options);
  }

  public loadScript(url) {
    console.log('preparing to load...');
    const node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
 }
  getSingleBook(): void {
    this.bookService.getBooks('/new-books' + this.filter + this.sort + this.pageNo + this.product_per_page)
    .subscribe((response) => {
      // this.getBooks = response;
      this.getBooks = response[0].list;
      this.pagings = response[1].paging[0];
    });
  }

  getDynCategory(): void {
    const urlLinkss = this.urlLink.toLowerCase();
    this.menu.getdynCategory()
    .subscribe(result => {
      this.menulist = result;
      this.menulist.forEach((value) => {
        // str.search(/blue/i)
        if (value.menuLink.toLowerCase().includes(urlLinkss)) {
          this.dynamicCategory = value.submenu;
          console.log(value.submenu);
        }
      });
      console.log(this.dynamicCategory);
    });
  }
  changesAffected() {
    console.log(this.minValue + '-' + this.maxValue);
    this.filter = '&filterprice='+ this.minValue + '-' + this.maxValue;
    this.getSingleBook();
  }
  useSort($event: any) {
    this.sort = $event;
    this.getSingleBook();
  }
  usePageNo($event: any) {
    this.pageNo = $event;
    this.getSingleBook();
  }
}
