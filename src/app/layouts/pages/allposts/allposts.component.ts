import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { PostsService } from '../../../core/services/posts/posts.service';
import { Posts } from '../../../core/interfaces/posts';
import { DatePipe } from '@angular/common';
import { AllcommentpostComponent } from "../allcommentpost/allcommentpost.component";
import { CreateCommentComponent } from "../create-comment/create-comment.component";
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
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/users/user.service';

@Component({
  selector: 'app-allposts',
  standalone: true,
  imports: [NavbarComponent, DatePipe, AllcommentpostComponent, CreateCommentComponent, FormsModule],
  templateUrl: './allposts.component.html',
  styleUrl: './allposts.component.scss'
})
export class AllpostsComponent implements OnInit {
  allPosts: WritableSignal<Posts[]> = signal([]);
  bodyPost:string = '';
  selectedFile: File | null = null;
  user!:any;
  constructor(private _router:Router, private _posts: PostsService, private flowbite:FlowbiteService, private _user: UserService){

  }
  ngOnInit(): void {
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
    this.flowbite.loadFlowbite((flow)=>{
    })
    window.localStorage.setItem('currentPage', this._router.url);
    this.user = JSON.parse(window.localStorage.getItem('user')!);
    this.getAllPosts();

  }

  getAllPosts(){
    this._posts.getAllPosts().subscribe({
      next: (res)=>{
        this.allPosts.set(res.posts);
        this.getUserPost();
      }
    })
  }

  getUserPost(){
    this._user.getUserPost(this.user._id).subscribe({
      next:(res)=>{
        this.allPosts.update((val)=> [...res.posts, ...val]);
        console.log(this.allPosts())
      }
    })
  }

  catchImage(event: Event){
    let file = event.target as HTMLInputElement
    if(file.files && file.files.length > 0){
      this.selectedFile = file.files[0];
    }
  }
  sendPost(){
    let formdata = new FormData();
    if(this.selectedFile){
      formdata.append('body', this.bodyPost);
      formdata.append('image', this.selectedFile)
    }
    this._posts.createPosts(formdata).subscribe({
      next:(res)=>{
        console.log(res);
        this.getAllPosts()
      }
    })
  }
 
}
