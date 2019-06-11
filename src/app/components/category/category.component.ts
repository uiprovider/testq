import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category: any[] = [
    {
      name: 'Books',
      total: 4
    },
    {
      name: 'Books',
      total: 4
    },
    {
      name: 'Books',
      total: 4
    },
    {
      name: 'Books',
      total: 4
    },
    {
      name: 'Books',
      total: 4
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
