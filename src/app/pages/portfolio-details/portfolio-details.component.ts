import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/interface/book';

@Component({
  selector: 'app-portfolio-details',
  templateUrl: './portfolio-details.component.html',
  styleUrls: ['./portfolio-details.component.css']
})
export class PortfolioDetailsComponent implements OnInit {
  getBook: Book[];
  constructor(public router: ActivatedRoute) { }

  ngOnInit() {
    const uniqueId = this.router.snapshot.paramMap.get('uniqueId');
  }

}
