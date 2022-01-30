import { Component, OnInit } from '@angular/core';
import { EcommerceService } from 'src/app/providers/services/ecommerce.service';

@Component({
  selector: 'app-uploadimg',
  templateUrl: './uploadimg.component.html',
  styleUrls: ['./uploadimg.component.css']
})
export class UploadimgComponent implements OnInit {

  myFile:any
  constructor(private _data:EcommerceService) { }

  ngOnInit(): void {
  }
  onChange(event:any){
    console.log(event.target.files[0])
    this.myFile= event.target.files[0]
  }
  onUpload(){
    const formData = new FormData()
    formData.append('img', this.myFile, this.myFile.name)
    this._data.uploadImg(formData).subscribe(data=>console.log(data))
  }

}
