import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EcommariaService {

  constructor(private _http: HttpClient) { }

  getAll(){
    return this._http.get('api/products');
  }

  create(product){
    return this._http.post('api/products', product);
  }
}
