import {  Component, OnInit, signal, WritableSignal } from '@angular/core';
import {  Router } from '@angular/router';
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
export class AllpostsComponent implements OnInit{
  allPosts: WritableSignal<Posts[]> = signal([]);
  bodyPost:string = '';
  selectedFile: File | null = null;
  user!:any;

  constructor(private _router:Router, private _posts: PostsService, private flowbite:FlowbiteService, private _user: UserService){
    console.log('https://linked-posts.routemisr.com/users/profile-data'.indexOf('profile-data'))
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
    // this.flowbite.loadFlowbite((flow)=>{
    // })
    window.localStorage.setItem('currentPage', this._router.url);
    //  this.user = JSON.parse(window.localStorage.getItem('user')!);
    this.getallPost();
  }
  // getAllPost(){
  //   this._posts.getAllPostsM(this.user._id).subscribe({
  //     next:(res)=>{
  //           this.allPosts.set(res)
  //         }
  //   })
    
  // }
  getallPost(){
    this._posts.getAllPosts().subscribe({
      next:(res)=>{
        this.allPosts.update((val)=> val = res.posts)
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
        this.getallPost();
      }
    })
  }
  loading(){
    this.getallPost();
  }
  addopen(event:Event){
    const ele = event.target as HTMLElement;
    const par = ele.parentNode as HTMLElement;
    par.classList.add('open')
  }
  deleteopen(event:Event){
    const ele = document.getElementById("comment") as HTMLElement;
    ele.classList.remove('open');
  }

 
}
