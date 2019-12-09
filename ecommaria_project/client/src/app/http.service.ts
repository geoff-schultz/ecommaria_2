import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { 

  }

  signIn(signin_body){

    const observable = this._http.post("auth/convert-token", signin_body)
    observable.subscribe((data)=>{console.log(data)})    
    
    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', 'auth/convert-token');
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.onload = function() {
    //   console.log(xhr);
    // };
    // xhr.send("grant_type=convert_token&client_id="+signin_body.getAll("client_id")+"&client_secret="+signin_body.getAll("client_secret")+"&backend=google-oauth2&token="+signin_body.getAll("token"));

  }

  getProducts(){
    // our http response is an Observable, store it in a variable
    let tempObservable = this._http.get('api/product');
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    tempObservable.subscribe(data => console.log("Got Stuff!", data));
 }


}
