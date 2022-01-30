import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AuthInterceptor } from './providers/interceptors/auth.interceptor';
import { AllusersComponent } from './components/pages/allusers/allusers.component';
import { Err404Component } from './err404/err404.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductCardComponent } from './components/pages/product-card/product-card.component';
import { UserProductComponent } from './components/pages/user-product/user-product.component';
import { AddproductComponent } from './components/pages/addproduct/addproduct.component';
import { UploadimgComponent } from './components/uploadimg/uploadimg.component';
import { UploadProductimgComponent } from './components/upload-productimg/upload-productimg.component';
import { SingleProductComponent } from './components/pages/single-product/single-product.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    AllusersComponent,
    Err404Component,
    ProfileComponent,
    HomeComponent,
    ProductCardComponent,
    UserProductComponent,
    AddproductComponent,
    UploadimgComponent,
    UploadProductimgComponent,
    SingleProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
