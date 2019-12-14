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

  getProducts(){
    // our http response is an Observable, store it in a variable
    let tempObservable = this._http.get('api/product');
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    tempObservable.subscribe(data => console.log("Got Stuff!", data));
 }

 submitProduct(product, auth){
  return this._http.post('api/product/', product, { headers: new HttpHeaders().set('Authorization', `bearer google ${auth}`), })
 }


}
