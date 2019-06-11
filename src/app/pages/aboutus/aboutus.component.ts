import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    // const routers = this.router.snapshot.paramMap.get('link');
    // console.log(routers);
    this.loadScript('assets/js/active.js');
  }
  public loadScript(url) {
    console.log('preparing to load...');
    const node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
 }
}
