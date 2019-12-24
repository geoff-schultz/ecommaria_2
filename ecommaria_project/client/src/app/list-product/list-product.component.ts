import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  private products: any;
  private auth: any;

  constructor(private _data: DataService, private _http: HttpService) { }

  ngOnInit() {
    this._http.getAllProducts().subscribe((data)=>{
      this.products = data;
      this.products.forEach((p)=>{
        p["id"] = p["url"].replace('http://localhost:8000/api/product/', '').replace('/','')
      })
    },
    (err)=>console.log(err))
  }

}
