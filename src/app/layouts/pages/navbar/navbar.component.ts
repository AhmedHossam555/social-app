import { Component, Input, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/users/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/users/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isDashed:WritableSignal<boolean> = signal(false);

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
       this.getLoggedUserData();
      }
    
    })
  }

}

