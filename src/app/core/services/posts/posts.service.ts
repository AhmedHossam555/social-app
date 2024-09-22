import { Enviroment } from './../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private _http: HttpClient) { }
  createPosts(data:any):Observable<any>{
    return this._http.post(`${Enviroment.baseUrl}/posts`,data);
  }
  getAllPosts():Observable<any>{
    return this._http.get(`${Enviroment.baseUrl}/posts?limit=50`);
  }
  getUserPosts(id:string):Observable<any>{
    return this._http.get(`${Enviroment.baseUrl}/users/${id}/posts?limit=2`);
  }
  getSinglePost(id:string):Observable<any>{
    return this._http.get(`${Enviroment.baseUrl}/posts/${id}`)
  }
}
