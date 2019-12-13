import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { HttpService } from './http.service';
import { DataService } from "./data.service";
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private user: SocialUser;
  private auth: string;
  private loggedIn: boolean;
  private signin_body: FormData;
  private backendUser;

  constructor(private _data: DataService, private authService: AuthService, private _httpService: HttpService, private cookieService: CookieService) { }
  
  ngOnInit() {
    this._data.currentAuth.subscribe(auth => this.auth = auth)
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if(this.loggedIn == true){
      this.backendSignIn();
    }
  })
}


backendSignIn(){
        // console.log("Is user null?", this.user)
          this.signin_body = new FormData();
            this.signin_body.append("grant_type", "convert_token")
            this.signin_body.append("client_id", "1oQcAX8mjqx0qmRt7ELEGVXH4PsXPNFjXoBwagF7")
            this.signin_body.append("client_secret", "KRyk6m466woOwxSXidbUAslcUDfKgSnaengmNe2DL0WJfMj9NEalExKJEpzpPoMJcQKmQLDZDupLb67VZ1MonjqTE3umFOVWy5EWsL98yWEgkJfIdcE9htzVlMgHUTif")
            this.signin_body.append("backend", "google-oauth2")
            this.signin_body.append("token", this.user.authToken)
            this._httpService.signIn(this.signin_body).subscribe((u)=> {
              this.backendUser = u
              this.newAuth(u["access_token"]);
            })
        }


  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(()=>{
      console.log("Signed in with Google")
    })
      .catch((err)=>console.log(err))
  }
  

  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // } 

  signOut(): void {
    this.signin_body = new FormData;
    this.authService.signOut();
  }

  newAuth(auth) {
    this._data.changeAuth(auth)
  }


 }
