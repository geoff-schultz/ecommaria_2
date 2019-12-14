import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { 
  }

  signIn(signin_body){
    console.log("Posting sign in to back end:")
    for (var pair of signin_body.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }
    return  this._http.post("auth/convert-token/", signin_body)
    // tempObservable.subscribe(data => console.log("Got Stuff!", data));
  }

  getProducts(auth){
    return this._http.get('api/product', { headers: new HttpHeaders().set('Authorization', `bearer google ${auth}`)});

 }

 submitProduct(product, auth){
  return this._http.post('api/product/', product, { headers: new HttpHeaders().set('Authorization', `bearer google ${auth}`), })
 }


}
