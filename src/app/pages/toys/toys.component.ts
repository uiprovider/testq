import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/interface/book';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-toys',
  templateUrl: './toys.component.html',
  styleUrls: ['./toys.component.css']
})
export class ToysComponent implements OnInit {

  dynamicCategory: any;
  menulist: any[] = [];
  getBooks: Book[] = [];
  sub:  any;
  filtername: any;
  urlLink: any = '';
  constructor(
    private router: ActivatedRoute,
    public bookService: BookService,
    private route: Router,
    private menu: MenuService) { }

  ngOnInit() {
    // this.getSingleBook();
    // this.category = + this.router.snapshot.paramMap.get('category');
    this.sub = + this.router.snapshot.paramMap.get('sub');
    this.filtername = + this.router.snapshot.paramMap.get('filtername');
    // console.log(this.route.url);
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

  public loadScript(url) {
    console.log('preparing to load...');
    const node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
 }
  getSingleBook(): void {
    this.bookService.getBooks(this.urlLink)
    .subscribe((response) => {
      this.getBooks = response;
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

}
