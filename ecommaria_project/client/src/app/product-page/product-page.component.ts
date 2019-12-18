import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router  } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  private prod: any;
  private auth: any;
  private errors = [];

  constructor(private _data: DataService, private _http: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this._data.currentAuth.subscribe(auth => {
      this.auth = auth
    })
    this.getProduct()
  }

  getProduct(){
    this._route.params.subscribe((params: Params) => {
    let tempObservable = this._http.getProduct(params["id"])
    tempObservable.subscribe(
      (res) => {
        this.prod = res
      },
      (err) => console.log(err)
      );
  })
}


}
