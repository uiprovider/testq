import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor(private http: HttpClient) { }

  getSlideshow(): Promise<any> {
    const slidePromise = new Promise((resolve, reject) => {
      const url = 'http://momandkidsbooks.com/view/controller.php?action=getslideshow';
      this.http.get(url).toPromise()
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
    });
    return slidePromise;
  }
}
