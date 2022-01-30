import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/auth.service';
import { EcommerceService } from 'src/app/providers/services/ecommerce.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  msg:string='';
  constructor(private _userSer:EcommerceService,private _auth:AuthService,private router:Router) {

  }

  ngOnInit(): void {
    this._auth.flag=false
  }
  handleForm(data:NgForm){
    if(data.valid){
      this._userSer.addUser(data.value).subscribe(
        (d)=>{},
        (err)=>{
          this.msg=err.error.data
        },
        ()=>{
          this.msg='';
          this._auth.flag=true;
          data.resetForm();
          this.router.navigateByUrl('/login')}
      )
    }

  }
}
