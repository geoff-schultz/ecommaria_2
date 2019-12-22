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

  private product: any;
  private product_id: any;
  private auth: any;
  private errors = [];
  private categories = [];

  constructor(private _data: DataService, private _http: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this._data.currentAuth.subscribe(auth => {
      this.auth = auth
    })
    this.getProduct()
  }

  getProduct(){
    this._route.params.subscribe((params: Params) => {
      this.product_id = params["id"];
      let tempObservable = this._http.getProduct(params["id"])
      tempObservable.subscribe((res) => {
        console.log(res)
        this._http.getCategoriesByProduct(params["id"]).subscribe((categories) => {
          this.categories = categories;
          this.categories.forEach((c)=>{
            c["id"] = c["url"].replace('http://localhost:8000/api/category/', '').replace('/','')
          })
          },
          (err) => console.log(err)
          )
          this.product = res
        },
      (err) => console.log(err)
      );
  })
}


}
