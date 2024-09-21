import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Signup } from '../interfaces/signup';
import { Enviroment } from '../../enviroments/enviroment';
import { Signin } from '../interfaces/signin';

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
}
