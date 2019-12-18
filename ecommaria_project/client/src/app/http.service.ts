import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'my-auth-token'
  })
};

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
  }

  getAllProducts(auth){
    return this._http.get('api/product', { headers: new HttpHeaders().set('Authorization', `bearer google ${auth}`)});
 }

 getProduct(p_id){
   return this._http.get(`api/product/${p_id}` )
 }

 submitProduct(product, auth){
  httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer google ${auth}`);
  return this._http.post<any>('api/product/', product, httpOptions )
 }


}
