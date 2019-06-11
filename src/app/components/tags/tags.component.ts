import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tags: any[] = [
    {
      name: 'Biography',
      link: 'www.google.com'
    },
    {
      name: 'Business',
      link: 'www.google.com'
    },
    {
      name: 'Cookbooks',
      link: 'www.google.com'
    },
    {
      name: 'Health and fitness',
      link: 'www.google.com'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
