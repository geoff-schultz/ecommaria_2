import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { HttpService } from './http.service';
import { DataService } from "./data.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private user: SocialUser;
  private auth: any;
  private loggedIn: boolean;
  private signin_body: FormData;

  constructor(private _router: Router, private _data: DataService, private authService: AuthService, private _httpService: HttpService) { }
  
  ngOnInit() {
    this._data.currentAuth.subscribe(auth => {
      this.auth = auth
    })
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if(this.loggedIn == true){
      this.backendSignIn();
      this._router.navigate(['/product']);
    }
  })
}


backendSignIn(){
          this.signin_body = new FormData();
            this.signin_body.append("grant_type", "convert_token")
            this.signin_body.append("client_id", "bZlbriSlz84wosUXiKikymsswgD4SwJq4vZMorrQ")
            this.signin_body.append("client_secret", "F6P6k4OJ1c0WJARIEcBVFWkuucFGpkHpuiVS7BuImFInYFmlbx9yv0C2g0kliNltefMjeeFkIhqXJdcvuWfpVGR1jM81euVPAqddFitjwg2U5uA9ae1arCc67djCz8yO")
            this.signin_body.append("backend", "google-oauth2")
            this.signin_body.append("token", this.user.authToken)
            this._httpService.signIn(this.signin_body).subscribe((u)=> {
              this.newAuth(u);

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
