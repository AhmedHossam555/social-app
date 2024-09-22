import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { PostsService } from '../../../core/services/posts/posts.service';
import { Posts } from '../../../core/interfaces/posts';
import { DatePipe } from '@angular/common';
import { AllcommentpostComponent } from "../allcommentpost/allcommentpost.component";

@Component({
  selector: 'app-allposts',
  standalone: true,
  imports: [NavbarComponent, DatePipe, AllcommentpostComponent],
  templateUrl: './allposts.component.html',
  styleUrl: './allposts.component.scss'
})
export class AllpostsComponent implements OnInit {
  allPosts: WritableSignal<Posts[]> = signal([]);
  ishow: WritableSignal<boolean> = signal(false);
  constructor(private _router:Router, private _posts: PostsService){

  }
  ngOnInit(): void {
    window.localStorage.setItem('currentPage', this._router.url);
    this.getAllPosts()
  }

  getAllPosts(){
    this._posts.getAllPosts().subscribe({
      next: (res)=>{
        this.allPosts.set(res.posts)
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
