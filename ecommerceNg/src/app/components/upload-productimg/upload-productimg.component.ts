import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/providers/services/product.service';

@Component({
  selector: 'app-upload-productimg',
  templateUrl: './upload-productimg.component.html',
  styleUrls: ['./upload-productimg.component.css']
})
export class UploadProductimgComponent implements OnInit {

  myFile:any
  constructor(private _data:ProductService) { }

  ngOnInit(): void {
  }
  onChange(event:any){
    console.log(event.target.files[0])
    this.myFile= event.target.files[0]
  }
  onUpload(){
    const formData = new FormData()
    formData.append('img', this.myFile, this.myFile.name)
   // this._data.uploadImg(formData,).subscribe(data=>console.log(data))
  }
}
