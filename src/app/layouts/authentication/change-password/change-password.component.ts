import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { NavbarComponent } from "../../pages/navbar/navbar.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/users/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [NavbarComponent,ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  constructor(private _auth:AuthService){

  }

  changeForm: FormGroup = new FormGroup({
    password: new FormControl(null,[Validators.required, Validators.pattern(/^([a-zA-Z]{2,})[!@#$&*]?(\d{3,}$)/ig)]),
    newPassword: new FormControl(null,[Validators.required, Validators.pattern(/^([a-zA-Z]{2,})[!@#$&*]?(\d{3,}$)/ig)])
  })

  onSubmit(){
    
    this._auth.changePassword(this.changeForm.value).subscribe({
      next:(res)=>{
        if(res.message == "success"){
          window.localStorage.setItem('userToken',res.token);
        }
      }
    })
  }

}