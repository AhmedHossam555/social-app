import { Component, computed, effect, input, Input, InputSignal, OnChanges, OnInit, signal, WritableSignal } from '@angular/core';
import { CommentsService } from '../../../core/services/comments/comments.service';
import { Comment } from '../../../core/interfaces/posts';
import { DatePipe } from '@angular/common';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';

@Component({
  selector: 'app-allcommentpost',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './allcommentpost.component.html',
  styleUrl: './allcommentpost.component.scss'
})
export class AllcommentpostComponent implements OnChanges, OnInit {
  Id:InputSignal<string> = input('');
  ishow: WritableSignal<boolean> = signal(false);
   comments:WritableSignal<Comment[]> = signal([]);

  constructor(private _comments: CommentsService,private _flow:FlowbiteService){
 
  }
  ngOnInit(): void {
    this._flow.loadFlowbite((flow)=>{})
  }
 
  ngOnChanges(){
    this._comments.getPostsComment(this.Id()).subscribe({
      next:(res)=>{
        this.comments.set(res.comments)
      }
    })
  }
  showComment(){
    this._comments.getPostsComment(this.Id()).subscribe({
      next:(res)=>{
        this.comments.set(res.comments)
      }
    })
    setTimeout(()=>{
      this.ishow.set(true);
    },1000)
  }
  hiddenComment(){
    this.ishow.set(false);
  }
  
}
