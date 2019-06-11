import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-age',
  templateUrl: './age.component.html',
  styleUrls: ['./age.component.css']
})
export class AgeComponent implements OnInit {

  ageCategory: any[] = [
    {
      id: 1,
      name: 'Upto 2 years'
    },
    {
      id: 2,
      name: '3 to 4 years'
    },
    {
      id: 3,
      name: '4 to 6 years'
    },
    {
      id: 4,
      name: '12 to 20 years'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
