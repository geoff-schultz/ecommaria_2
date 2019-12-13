import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//imported as per tutorial
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
//import end

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './http.service';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { CreateProductComponent } from './create-product/create-product.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';



//config as per tutorial
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("532114875168-vuiqei9m4ev3mpcffshsji2nch80jtd6.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("Facebook-App-Id")
  }
]);
//end of config

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    CreateProductComponent,
    ManageProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
  ],
  providers: [
    HttpService,
    DataService,
    CookieService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
