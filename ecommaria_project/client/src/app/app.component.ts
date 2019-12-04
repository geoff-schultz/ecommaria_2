import { Component } from '@angular/core';
import { EcommariaService } from './ecommaria.service';
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  private user: SocialUser;
  private loggedIn: boolean;

  constructor(private authService: AuthService, private _ecommariaService : EcommariaService){

  }
 
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
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
