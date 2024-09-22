import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from '../../../enviroments/enviroment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private _http: HttpClient) { }
  createComment(data:any):Observable<any>{
    return this._http.post(`${Enviroment.baseUrl}/comments`,data)
  }
  getPostsComment(id:string):Observable<any>{
    return this._http.get(`${Enviroment.baseUrl}/posts/${id}/comments`)
  }
}
