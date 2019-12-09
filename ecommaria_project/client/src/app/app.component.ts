import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { HttpService } from './http.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private cookieValue = 'UNKNOWN';
  private user: SocialUser;
  private loggedIn: boolean;
  private signin_body = new FormData()

  constructor(private authService: AuthService, private _httpService: HttpService, private cookieService: CookieService) { }
  
  ngOnInit() {
this.backendSignIn();

  //   if(!this.cookieService.get("Site")){
  //     console.log("Creating Cookie")
  //   this.cookieService.set( 'Site', 'Ecommaria' );
  //   this.cookieValue = this.cookieService.get('Site');
  // }
  // else {
  //   this.cookieValue = this.cookieService.get("Site")
  //   console.log(this.cookieValue)
  //   if(this.cookieService.get("LogInStatus") === "True"){
  //     this.user = this.cookieService.get("User")
  //   }

    // }
  }


backendSignIn(){

  this.authService.authState.subscribe((user) => {
    this.user = user;
    this.loggedIn = (user != null);

        if(this.loggedIn == true){
            this.signin_body.set("grant_type", "convert_token")
            this.signin_body.set("client_id", "qtldLa1Pbg2IkqhZJhb8zz119JzRtYGYzzFMgF4P")
            this.signin_body.set("client_secret", "jOvnVMxyqme8XGQAEoHVB7DAExXKxjwfBJi3SjyifHgglhDHAMtOsbaeEAHn8Ju9zBGPg2x7yF2yYyoiXxAmdgCf1wTdCIwCWBuyYQ60RPkXOTqu8dSav6tfcRQlCHqM")
            this.signin_body.set("backend", "google-oauth2")
            this.signin_body.set("token", user.authToken)
            console.log(this.signin_body.getAll("grant_type"))
            this._httpService.signIn(this.signin_body)
        }
  })
}


  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then((user: SocialUser)=>{
      this.backendSignIn()
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


 }
