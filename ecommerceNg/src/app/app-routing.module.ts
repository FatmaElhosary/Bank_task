import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './components/pages/addproduct/addproduct.component';
import { AllusersComponent } from './components/pages/allusers/allusers.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { SingleProductComponent } from './components/pages/single-product/single-product.component';
import { UserProductComponent } from './components/pages/user-product/user-product.component';
import { UploadimgComponent } from './components/uploadimg/uploadimg.component';
import { Err404Component } from './err404/err404.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'user',children:[
  {path:'all',component:AllusersComponent},
  {path:'profile',component:ProfileComponent},
  {path:'products',component:UserProductComponent},
  {path:'uploadimg',component:UploadimgComponent},
  {path:'show/:id',component:UploadimgComponent},
  {path:'edit/:id',component:UploadimgComponent},
  ]},
  {path:'product',children:[
    {path:'all',component:AllusersComponent},
    {path:':id',component:SingleProductComponent},
    {path:'addProduct',component:AddproductComponent},
    {path:'myProduct',component:UserProductComponent},
    ]},

  {path:'**',component:Err404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
