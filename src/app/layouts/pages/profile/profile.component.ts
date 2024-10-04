import { DatePipe } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { UserService } from '../../../core/services/users/user.service';
import { Posts } from '../../../core/interfaces/posts';

import { AllcommentpostComponent } from "../allcommentpost/allcommentpost.component";
import { CreateCommentComponent } from "../create-comment/create-comment.component";
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


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, AllcommentpostComponent, CreateCommentComponent, DatePipe,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  isOpen:boolean = false
  user!:any;
  id!:string;
  allPosts: WritableSignal<Posts[]> = signal([]);
  constructor(private _user: UserService){
    this.getAllUser();
    this.getUserPost();
    this.getLoggedUserData();
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
  }
  updateOpen(event:Event){
    const eventEle = event.target as HTMLElement;
    const par = eventEle.parentNode as HTMLElement;
    par.classList.toggle('open')
  }
  getAllUser(){
    this.id = JSON.parse(window.localStorage.getItem('user')!)._id
    }
  
  getUserPost(){
    this._user.getUserPost(this.id).subscribe({
      next:(res)=>{
        this.allPosts.set(res.posts)
      }
    })
  }
  getLoggedUserData(){
    this._user.getLoggedUserData().subscribe({
      next: (res)=>{
        this.user = res.user;
        window.localStorage.setItem('user',JSON.stringify(res.user));
      }
    })
  }

  formData: FormData = new FormData();
  selectedImage: File | null = null;
  catchImg(event:Event){
 
    let inputFile = event.target as HTMLInputElement;
    if(inputFile.files && inputFile.files.length > 0){
      this.selectedImage = inputFile.files[0];
    }
  }
  loading(){
    this.getLoggedUserData();
    this.getUserPost();
  }
  sendPost(){
   
    if(this.selectedImage){
      this.formData.append('photo', this.selectedImage);
    }
    console.log(this.selectedImage)
    this._user.uploadProfilePhoto(this.formData).subscribe({
      next:(res)=>{
        if(res.message == "success"){
          this.getLoggedUserData();
          this.getUserPost();
        }
      }
    })
  }
}
