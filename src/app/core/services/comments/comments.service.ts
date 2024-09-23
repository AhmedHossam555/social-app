import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Enviroment } from '../../../enviroments/enviroment';
import { Observable } from 'rxjs';
import { Commentpost } from '../../interfaces/commentpost';
import { Comment } from '../../interfaces/posts';
@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  comments: WritableSignal<Comment[]> = signal([]);
  constructor(private _http: HttpClient) { }
  createComment(data:Commentpost):Observable<any>{
    return this._http.post(`${Enviroment.baseUrl}/comments`,data)
  }
  getPostsComment(id:string):Observable<any>{
    return this._http.get(`${Enviroment.baseUrl}/posts/${id}/comments`)
  }
}
