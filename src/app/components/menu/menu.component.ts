import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menulist: any[] = [];
  constructor(private menu: MenuService) { }

  ngOnInit() {
    this.menu.getMenus()
    .subscribe(result => {
      this.menulist = result;
      console.log(this.menulist);
    });
  }

}
