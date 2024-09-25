import { DatePipe } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { UserService } from '../../../core/services/users/user.service';
import { Posts } from '../../../core/interfaces/posts';

import { AllcommentpostComponent } from "../allcommentpost/allcommentpost.component";
import { CreateCommentComponent } from "../create-comment/create-comment.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, AllcommentpostComponent, CreateCommentComponent, DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user!:any;
  allPosts: WritableSignal<Posts[]> = signal([]);
  constructor(private _user: UserService){
    this.getAllUser();
    this.getUserPost();
  }

  getAllUser(){
    this.user = JSON.parse(window.localStorage.getItem('user')!)
    }
  
  getUserPost(){
    this._user.getUserPost(this.user._id).subscribe({
      next:(res)=>{
        this.allPosts.set(res.posts)
      }
    })
  }
}
