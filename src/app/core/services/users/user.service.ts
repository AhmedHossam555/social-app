import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { };

  getLoggedUserData():Observable<any>{
    return this._http.get(`${Enviroment.baseUrl}/users/profile-data`, {
      headers: {
        token: window.localStorage.getItem('userToken')!,
      }
    })
  }
  uploadProfilePhoto(image:any):Observable<any>{
    return this._http.put(`${Enviroment.baseUrl}/users/upload-photo`,image, {
      headers: {
        token: window.localStorage.getItem('userToken')!,
      }
    })
  }
  getUserPost(id:string):Observable<any>{
    return this._http.get(`${Enviroment.baseUrl}/users/${id}/posts?limit=2`,{
      headers: {
        token: window.localStorage.getItem('userToken')!,
      }
    })
  }
  
}
