import { Component, inject, Input, input, InputSignal, Output, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/users/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/users/user.service';
import { EventEmitter } from '@angular/core';
import { DarkService } from '../../../core/services/dark.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isDashed:WritableSignal<boolean> = signal(false);
  @Output() emited = new EventEmitter<any>();
  _dark:DarkService = inject(DarkService)

  @Input() user!:any;
  constructor(private _auth: AuthService,private _router: Router, private _user:UserService){

  }
  ngOnInit() {
  this.getLoggedUserData();
  }
  signOut(){
    window.localStorage.removeItem('userToken');
    this._router.navigate(['/login'])
    this._auth.userInfo.set(null);
    window.localStorage.removeItem('user')
  }
  openDash(){
    this.isDashed.set(true);
  }
  closeDash(){
    this.isDashed.set(false);
  }
  getLoggedUserData(){
    this._user.getLoggedUserData().subscribe({
      next: (res)=>{
        this.user = res.user;
        //window.localStorage.setItem('user', JSON.stringify(res.user))
      }
    })
  }
  formData: FormData = new FormData();
  selectedImage: File | null = null;
  catchImage(event:Event){
    let inputFile = event.target as HTMLInputElement;
    if(inputFile.files && inputFile.files.length > 0){
      this.selectedImage = inputFile.files[0];
    }
  }

  onSend(){
    if(this.selectedImage){
      this.formData.append('photo', this.selectedImage);
    }
    this._user.uploadProfilePhoto(this.formData).subscribe({
      next:(res)=>{
        if(res.message == "success"){
          this.getLoggedUserData();
          this.emited.emit()
        }
      }
    
    })
  }

}

