import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Signup } from '../../interfaces/signup';
import { Enviroment } from '../../../enviroments/enviroment';
import { Signin } from '../../interfaces/signin';
import { jwtDecode } from 'jwt-decode';
import { Token } from '@angular/compiler';
import { Change } from '../../interfaces/change';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  signUp(form:Signup):Observable<any>{
    return this._http.post(`${Enviroment.baseUrl}/users/signup`,form);
  }
  signin(form:Signin):Observable<any>{
    return this._http.post(`${Enviroment.baseUrl}/users/signin`,form);
  }
  changePassword(form:Change):Observable<any>{
    return this._http.patch(`${Enviroment.baseUrl}/users/change-password`,form,
     {
      headers: {
        token: window.localStorage.getItem('userToken')!,
      }
     }
    );
  }
  
  userInfo:WritableSignal<any> = signal(null);
  userInformation(){
    const token = JSON.stringify(window.localStorage.getItem('userToken'));
    const decoded = jwtDecode(token);
    this.userInfo.set(decoded);
  }
}
