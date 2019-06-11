import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

export let removeCartItem = new Subject<any>();

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carts: any = [];
  totalItems: any = 0;
  totalAmount: any = 0;


  constructor(private router: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem('cart')) {
      this.carts = JSON.parse(sessionStorage.getItem('cart'));
      this.totalItems = this.carts.length;
    }
    this.getTotal();
  }
 getTotal() {
  let total = 0;
  for (const i of this.carts) {
    total += i.total + (i.total / 100 ) * i.gst;
  }
  this.totalAmount = total;
 }
 increaseQuantity(cart: any, event: any) {
  const cartinfo = JSON.parse(sessionStorage.getItem('cart'));
  console.log(event);
  for (const i of cartinfo) {
    if (i.uniqueId === cart.uniqueId) {
      i.quantity = parseInt(event, 10);
      i.total = i.quantity * parseInt(cart.newPrice, 10);
    }
  }
  sessionStorage.setItem('cart', JSON.stringify(cartinfo));
  this.ngOnInit();
}
removeItem(cart: any) {
  const cartinfo = JSON.parse(sessionStorage.getItem('cart'));
  console.log(event);
  for (const i of cartinfo) {
    const index = cartinfo.indexOf(i);
    if (i.uniqueId === cart.uniqueId) {
      cartinfo.splice(index, 1);
    }
  }
  sessionStorage.setItem('cart', JSON.stringify(cartinfo));
  removeCartItem.next(true);
  this.ngOnInit();
 }

 gotocheckout() {
  this.router.navigate(['/checkout']);
 }
}
