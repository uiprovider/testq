import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-category',
  templateUrl: './dynamic-category.component.html',
  styleUrls: ['./dynamic-category.component.css']
})
export class DynamicCategoryComponent implements OnInit {

  @Input() dynCategory: any;
  category: any[] = [];
  constructor() { }

  ngOnInit() {
    // console.log(this.dynCategory);
  }

}
