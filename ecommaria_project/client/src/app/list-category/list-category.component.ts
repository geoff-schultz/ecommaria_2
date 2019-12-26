import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {
  private categories: any;


  constructor(private _data: DataService, private _http: HttpService) { }

  ngOnInit() {
    this._http.getAllCategories().subscribe((data)=>{
      this.categories = data;
      this.categories = this.categories.filter((a) => {
        if(a.products[0]){
          return true;
        }})
        .sort((a, b) => (a.name > b.name) ? 1 : -1)
      this.categories.forEach((c)=>{
        c["id"] = c["url"].replace('http://localhost:8000/api/category/', '').replace('/','')
      })
    },
    (err)=>console.log(err))
  }

}

