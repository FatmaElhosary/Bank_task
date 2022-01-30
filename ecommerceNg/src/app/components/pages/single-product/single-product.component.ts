import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/providers/services/product.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
product:any;
isloaded:boolean=false;
  constructor(private _router:ActivatedRoute,private _productSer:ProductService) { }


  ngOnInit(): void {

    this.getProduct();

  }
getProduct(){
  this._productSer.getsinglePro(this._router.snapshot.paramMap.get('id')).subscribe((res)=>{
this.product=res.data;
console.log(res.data);

  },(err)=>{

  },()=>{
this.isloaded=true;
  })
}
}
