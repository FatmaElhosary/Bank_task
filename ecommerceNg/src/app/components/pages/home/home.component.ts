import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/providers/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  isloaded:boolean=false;
  constructor(private _productSer: ProductService) { }

  ngOnInit(): void {
    this._productSer.getAllPro().subscribe((res) => {
      this.products = res.data;
    }, (err) => {
      console.log(err);

    }, () => {
      this.isloaded=true;
    })

  }

}
