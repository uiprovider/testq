import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-letter',
  templateUrl: './news-letter.component.html',
  styleUrls: ['./news-letter.component.css']
})
export class NewsLetterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  subscribeForm(data: any) {
    console.log(data);
  }
}
