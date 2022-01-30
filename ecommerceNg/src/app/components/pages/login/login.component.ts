import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:any = {
    email:"",
    password:""
  }
  msg:string='';

  constructor(private _auth:AuthService,private router:Router) {
    _auth.flag=false
  }

  ngOnInit(): void {
  }
  handleLogin(data:NgForm){
    if(data.valid){
      console.log(this.user)
      this._auth.login(this.user).subscribe(
        (res)=>{
          localStorage.setItem('token',res.data.token)},
        (err)=>{this.msg=err.error.data},
        ()=>{
          this.msg='';
          this.x=false;
          this._auth.flag=true;
          data.resetForm();
          this.router.navigateByUrl('/');

        }

        )
    }
  }
  x=false
  test(){ this.x=true }
}
