import { HttpClient } from '@angular/common/http';
import { Component, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/users/auth.service';
import { UserService } from '../../../core/services/users/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isloading:WritableSignal<boolean> = signal(false);
  constructor(private _http: HttpClient,private _router: Router, private _auth: AuthService,private _user:UserService){

  }

  signinForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  })

  onSubmit(){
    this.isloading.set(true);
    console.log(this.signinForm.value)
    this._auth.signin(this.signinForm.value).subscribe({
      next: (res)=>{
     
        if(res.message == "success"){
          this.isloading.set(false);
          window.localStorage.setItem('userToken', res.token);
          this._auth.userInformation();
          this.getLoggedUserData();
          this._router.navigate(['/posts']);
        }
      },
      error:(err)=>{
        this.isloading.set(false);
      }
    })
  }
  getLoggedUserData(){
    this._user.getLoggedUserData().subscribe({
      next: (res)=>{
        window.localStorage.setItem('user', JSON.stringify(res.user))
      }
    })
  }
  
}
