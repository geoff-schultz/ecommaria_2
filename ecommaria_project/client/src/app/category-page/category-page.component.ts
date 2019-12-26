import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router  } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  constructor(private _data: DataService, private _http: HttpService, private _route: ActivatedRoute, private _router: Router) { }
  category: any;
  products = [];
  auth: any;

  ngOnInit() {
    this._data.currentAuth.subscribe(auth => {
      this.auth = auth
    })
    this.getCategory()
  }

  getCategory(){
    this._route.params.subscribe((params: Params) => {
    let tempObservable = this._http.getCategory(params["id"])
    tempObservable.subscribe((res) => {
      console.log(res)
      this._http.getProductsByCategory(params["id"]).subscribe((products) => {
        this.products = products;
        // this.products.forEach((p)=>{
        //   p["id"] = p["url"].replace('http://localhost:8000/api/product/', '').replace('/','')
        // })
        },
        (err) => console.log(err)
        )
        this.category = res
      },
      (err) => console.log(err)
      );
  })
}

}
