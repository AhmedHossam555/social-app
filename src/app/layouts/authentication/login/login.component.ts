import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/users/auth.service';
import { UserService } from '../../../core/services/users/user.service';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  isloading:WritableSignal<boolean> = signal(false);
  errMsg!:string;
  constructor(private _http: HttpClient,private _router: Router, private _auth: AuthService,private _user:UserService,private _flow:FlowbiteService){

  }
  signinForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
  })
  ngOnInit(): void {
    this._flow.loadFlowbite((flow)=>{});
  }

  onSubmit(){
    this.isloading.set(true);
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
        this.errMsg = err.error.error
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
