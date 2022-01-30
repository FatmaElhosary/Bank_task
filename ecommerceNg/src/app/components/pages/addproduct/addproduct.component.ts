import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/providers/services/product.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
addProduct:FormGroup=new FormGroup({
  name:new FormControl("",Validators.minLength(2)),
  description:new FormControl(''),
  price:new FormControl('',Validators.required),
  address:new FormControl(''),
  catId:new FormControl('',Validators.required),
  phone:new FormControl('',Validators.required),
})
  constructor(private _productSer:ProductService) { }

  ngOnInit(): void {
  }
get name(){
  return this.addProduct.get('name');
}
get description(){
  return this.addProduct.get('description');
}
get price(){
  return this.addProduct.get('price');
}
get catId(){
  return this.addProduct.get('catId');
}
get phone(){
  return this.addProduct.get('phone');
}
  handleproduct(){
    this._productSer.addProduct(this.addProduct.value).subscribe(
      (res)=>{console.log(res);}
      ,
      (err)=>{},
      ()=>{}
    )
//console.log((this.addProduct.value));

  }
}
