import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { url } from '../../constant/constants';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  showOrders: boolean = false;
  myOrders:any;
  myOrdersId: any;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.showOrders = false;
    const lc: any = JSON.parse(localStorage.getItem('user'));
    this.http.get(url + `view/controller.php?action=myorders&uniqueId=${lc.uniqueId}`)
    .toPromise()
    .then((data) => {
      this.myOrders = data;
    });
    if (!localStorage.getItem('user')) {
      this.router.navigate(['/myaccount']);
    } else {
      const lc: any = JSON.parse(localStorage.getItem('user'));
      if (lc.error === 1 || lc.error === '1') {
        this.router.navigate(['/myaccount']);
      }
    }
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/myaccount']);
    this.ngOnInit();
  }
  showDetailedOrder(order_id: any) {
    this.showOrders = true;
    const promise = new Promise((resolve, response) => {
      this.http.get(url + 'view/controller.php?action=orderdetails&order_id='+order_id)
      .toPromise()
      .then((data) => {
        this.myOrdersId = data;
      })
      .catch((err) => {
        console.log(err);
      });
    });
  }
}
