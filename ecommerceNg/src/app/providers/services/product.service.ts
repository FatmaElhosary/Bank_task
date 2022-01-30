import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http:HttpClient) { }
addProduct(product:any):Observable<any>{
  return this._http.post('http://localhost:3000/api/product/add',product)
}
uploadImg(imgs:any,id:any):Observable<any>{
  return this._http.post(`localhost:3000/api/product/${id}`,imgs)
}
getAllPro():Observable<any>{
  return this._http.get(`${environment.commenUrl}/product/all`)
}
getsinglePro(id:any):Observable<any>{
  return this._http.get(`${environment.commenUrl}/product/all/${id}`);
}
}
