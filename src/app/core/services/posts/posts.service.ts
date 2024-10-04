import { Enviroment } from './../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap, Observable } from 'rxjs';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private _http: HttpClient,private _user:UserService) { }
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
  getAllPostsM(id:string):Observable<any>{
    return this._http.get(`${Enviroment.baseUrl}/posts?limit=50`).pipe(
      mergeMap((res:any)=>{
        return this._user.getUserPost(id).pipe(
          map((val)=>{
            return [...val.posts, ...res.posts]
          })
        )
      })
    )
  }

  deletePost(id:string):Observable<any>{
    return this._http.delete(`${Enviroment.baseUrl}/posts/${id}`);
  }
}
