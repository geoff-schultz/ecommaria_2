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
  //   console.log("Posting sign in to back end:")
  //   for (var pair of signin_body.entries()) {
  //     console.log(pair[0]+ ', ' + pair[1]); 
  // }
    return  this._http.post("auth/convert-token/", signin_body)
  }

  getAllProducts(){
    return this._http.get('api/product');
 }

 getProduct(p_id){
   return this._http.get(`api/product/${p_id}` )
 }

 getProductsByCategory(c_id){
   return this._http.get<any>(`api/product/?categories=${c_id}`)
 }

 getCategoriesByProduct(p_id){
  return this._http.get<any>(`api/category/?products=${p_id}`)
}

 submitProduct(product, auth){
  httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer google ${auth["access_token"]}`);
  return this._http.post<any>('api/product/', product, httpOptions )
 }

 submitProductUpdate(product, auth, p_id){
  httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer google ${auth["access_token"]}`);
  return this._http.patch<any>(`api/product/${p_id}/`, product, httpOptions )
 }

 removeProductFromCategory(c_id, p_id, auth){
  httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer google ${auth["access_token"]}`);
  return this._http.delete<any>(`api/product/${p_id}/category/${c_id}/`, httpOptions )
 }

 getCategory(c_id){
  return this._http.get(`api/category/${c_id}`)
 }



}
