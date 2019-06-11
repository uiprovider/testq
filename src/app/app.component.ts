import { Component, OnInit, OnChanges } from '@angular/core';
import {loginEmitter} from './pages/my-account/my-account.component';
import { from, Observable, fromEvent, bindCallback, empty, fromEventPattern, range, of} from 'rxjs';
import { map, pairwise} from 'rxjs/operators';

import { cartEmitter } from './pages/single-product/single-product.component';
import { removeCartItem } from './pages/cart/cart.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'momandbaby';
  show = false;
  carts: any = [];
  totalItems: any = 0;
  totalAmount: any = 0;
  login: any;

constructor(private router: Router) {}

  ngOnInit(): void {
    this.getTotal();
    this.changeLogout();
    this.emittedCart();
    this.removeItem();
  }
  getTotal() {
    if (sessionStorage.getItem('cart')) {
      this.carts = JSON.parse(sessionStorage.getItem('cart'));
      this.totalItems = this.carts.length;
    } else {
      sessionStorage.setItem('cart', JSON.stringify([]));
    }
  }
  changeLogout() {
    loginEmitter.subscribe((data) => {
      console.log(data);
      this.login = data;
    });
  }

  emittedCart() {
    cartEmitter.subscribe((data) => {
      console.log(data);
      this.getTotal();
      console.log(this.totalItems);
    });
  }

  removeItem() {
    removeCartItem.subscribe((data) => {
      this.getTotal();
    });
  }

  calllogOut() {
    localStorage.removeItem('user');
    this.login = false;
    this.router.navigate(['/']);
  }
  getCart(): void {
    this.show = !this.show;
    let total = 0;
    this.carts = JSON.parse(sessionStorage.getItem('cart'));
    this.totalItems = this.carts.length;
    for (const i of this.carts) {
      total = total + i.total;
    }
    this.totalAmount = total;
  }
  closeCarts() {
    this.show = !this.show;
  }
}
