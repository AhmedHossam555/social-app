import { Component, input, Input, InputSignal, OnChanges, OnInit, signal, WritableSignal } from '@angular/core';
import { CommentsService } from '../../../core/services/comments/comments.service';
import { Comment } from '../../../core/interfaces/posts';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-allcommentpost',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './allcommentpost.component.html',
  styleUrl: './allcommentpost.component.scss'
})
export class AllcommentpostComponent implements OnChanges {
  Id:InputSignal<string> = input('');
  ishow: WritableSignal<boolean> = signal(false);
  comments:WritableSignal<Comment[]> = signal([]);
  constructor(private _comments: CommentsService){

  }
 
  ngOnChanges(){
    this._comments.getPostsComment(this.Id()).subscribe({
      next:(res)=>{
        this.comments.set(res.comments)
      }
    })
  }
  showComment(){
    this.ishow.set(true);
  }
  hiddenComment(){
    this.ishow.set(false);
  }
  
}
