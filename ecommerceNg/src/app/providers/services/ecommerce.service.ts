import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EcommerceService {

  constructor(private _http:HttpClient) { }
  addUser(userData:any):Observable<any>
  {
    return this._http.post(`${environment.commenUrl}/user/register`,userData)
  }
  getAllUsers():Observable<any>{
    return this._http.get('http://localhost:3000/api/user/all');
  }
  uploadImg(img:any):Observable<any>{
    return this._http.post('http://localhost:3000/api/user/profile',img)
  }

}
