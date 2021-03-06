import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EcommerceService } from 'src/app/providers/services/ecommerce.service';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {

  isloaded=false
  allUsers :any[] = []

  constructor(private _data:EcommerceService, private router:Router) { }

  ngOnInit(): void { this.getAllUsers() }

  getAllUsers(){
    this._data.getAllUsers().subscribe(
      (res)=>{ this.allUsers=res.data

       },
      (e)=>{ this.router.navigateByUrl('/login') },
      ()=>{this.isloaded=true}
    )
  }
  handleDelete(id:string){

  }

}
