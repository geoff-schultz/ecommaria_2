import { Component } from '@angular/core';
import { EcommariaService } from './ecommaria.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor(private _ecommariaService : EcommariaService){

  }

  getProducts(){
    let observable = this._ecommariaService.getAll();
    observable.subscribe(data => {
      console.log(data)
    })
  }

  makeProduct(){
    let product = {
      "name" : "Sweater",
      "description": "Warm and comfy.",
      "price" : "19.99",
    }
    let observable = this._ecommariaService.create(product);
    observable.subscribe(data => {
      console.log(data)
    })
  }
}
