import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/users/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private _http: HttpClient,private _router: Router, private _auth: AuthService){

  }

  signinForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  })

  onSubmit(){
    console.log(this.signinForm.value)
    this._auth.signin(this.signinForm.value).subscribe({
      next: (res)=>{
        console.log(res)
        if(res.message == "success"){
          window.localStorage.setItem('userToken', res.token);
          this._auth.userInformation();
          this._router.navigate(['/posts']);
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  
}
