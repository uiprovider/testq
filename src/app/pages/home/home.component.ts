import {Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/interface/book';
import { SliderService } from 'src/app/services/slider.service';
import { Options, LabelType  } from 'ng5-slider';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterContentInit, AfterViewInit {
  newArrivals: any[] = [];
  bestSellers: any[] = [];
  dynamicCategory: any[] = [
    {
      title: 'age',
      menu: [
        {
          menuLink: '/checkout',
          menuName: '5 to 10 yrs',
        },
        {
          menuLink: '/checkout',
          menuName: '10 to 15 yrs',
        },
        {
          menuLink: '/checkout',
          menuName: '15 to 25 yrs',
        },
        {
          menuLink: '/checkout',
          menuName: '25 to 35 yrs',
        }
    ]
    },
    {
      title: 'group',
      menu: [
        {
          menuLink: '/checkout',
          menuName: 'old',
        },
        {
          menuLink: '/checkout',
          menuName: 'new',
        },
        {
          menuLink: '/checkout',
          menuName: 'commercial',
        },
        {
          menuLink: '/checkout',
          menuName: 'technology',
        }
    ]
    }
  ]
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

  sliderMenu: any[] = [];
  sortBy: any = 'default'
  filterByprice: any = '10-100'
  urlLink: any = `sortBy = ${this.sortBy} & filterByPrice = ${this.filterByprice}`;
  getBooks: Book[] = [];

  sliderImages: any = [];

  // mySlideImages = [1, 2, 3].map((i) => `https://picsum.photos/640/480?image=${i}`);
  mySlideImages = [1, 2, 3, 4, 5, 6].map((i) => `https://picsum.photos/640/480?image=${i}`);
  mySlideOptions = {items: 1, dots: true, nav: false};
  myCarouselOptions = {items: 3, dots: true, nav: true};


  constructor(private router: ActivatedRoute,
    public bookService: BookService,
    private slider: SliderService) { }

  ngOnInit() {
    this.sliderImages = [
  ];
    // this.getSingleBook();
    this.getSlideshow();
    this.loadScript('assets/js/active.js');
  }
  ngAfterContentInit() {
    this.loadScript('assets/js/active.js');
  }
  ngAfterViewInit() {
    this.loadScript('assets/js/active.js');
  }
  public loadScript(url) {
    console.log('preparing to load...');
    const node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
 }
 public loadCss(url) {
  console.log('preparing to load css...');
  const node = document.createElement('link');
  node.href = url;
  node.rel = 'stylesheet';
  node.type = 'text/css';
  document.getElementsByTagName('head')[0].appendChild(node);
}
  getSingleBook(): void {
    this.bookService.getSingleBooks(this.urlLink)
    .subscribe((response) => {
      this.getBooks = response;
    });
  }
  getSlideshow(): void {
    this.slider.getSlideshow()
    .then((resp) => {
      // this.loadScript('assets/js/active.js');
      this.sliderMenu = resp;
      console.log('SLIDER');
      console.log(this.sliderMenu);
      for (const item of this.sliderMenu) {
        console.log(item.slide_image);
        this.sliderImages.push(item.slide_image);
      }
      setTimeout(() => {
        // alert('loaded succesfully');
        // this.loadScript('assets/js/vendor/modernizr-3.5.0.min.js');
        // this.loadScript('assets/js/vendor/jquery-3.2.1.min.js');
        // this.loadScript('assets/js/popper.min.js');
        // this.loadScript('assets/js/plugins.js');
        // this.loadScript('assets/js/active.js');
        // this.loadScript('assets/css/plugins.css');
      }, 10000);

      // this.loadScript('assets/js/active.js');
      console.log(this.sliderImages);
    });
  }
  getBackgroundImg(slides: any) {
    console.log('slide images url : ' + slides);
    return 'url(' + slides + ')';
  }
}
