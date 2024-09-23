import { Component, input, InputSignal, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommentsService } from '../../../core/services/comments/comments.service';

@Component({
  selector: 'app-create-comment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-comment.component.html',
  styleUrl: './create-comment.component.scss'
})
export class CreateCommentComponent implements OnChanges {
  Id:InputSignal<string> = input('')

  formComment!:FormGroup;
  constructor(private _comment: CommentsService){

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.formComment = new FormGroup({
      content: new FormControl(null),
      post: new FormControl(this.Id()),
    })
  }
  onSubmit(){
    this._comment.createComment(this.formComment.value).subscribe({
      next:(res)=>{
        this._comment.comments.set(res.comments);
      }
    })
  }
}
