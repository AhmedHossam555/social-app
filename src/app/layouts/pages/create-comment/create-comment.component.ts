import { Component, input, InputSignal, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommentsService } from '../../../core/services/comments/comments.service';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import {
  initAccordions,
  initCarousels,
  initCollapses,
  initDials,
  initDismisses,
  initDrawers,
  initDropdowns,
  initModals,
  initPopovers,
  initTabs,
  initTooltips,
} from 'flowbite';
@Component({
  selector: 'app-create-comment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-comment.component.html',
  styleUrl: './create-comment.component.scss'
})
export class CreateCommentComponent implements OnChanges,OnInit {
  Id:InputSignal<string> = input('')

  formComment!:FormGroup;
  constructor(private _comment: CommentsService,private _flow:FlowbiteService){

  }
  ngOnInit() {
    initAccordions();
    initCarousels();
    initCollapses();
    initDials();
    initDismisses();
    initDrawers();
    initDropdowns();
    initModals();
    initPopovers();
    initTabs();
    initTooltips();
    this._flow.loadFlowbite((flow)=>{})
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
