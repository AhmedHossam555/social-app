
import { Component } from '@angular/core';
import { NavbarComponent } from "../../pages/navbar/navbar.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/users/auth.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [NavbarComponent,ReactiveFormsModule,SweetAlert2Module],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  err!:string;
  constructor(private _auth:AuthService){

  }

  changeForm: FormGroup = new FormGroup({
    password: new FormControl(null,[Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    newPassword: new FormControl(null,[Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)])
  })

  onSubmit(){
   
    this._auth.changePassword(this.changeForm.value).subscribe({
      next:(res)=>{
        if(res.message == "success"){
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your already change password",
            showConfirmButton: false,
            timer: 1500
          });
          window.localStorage.setItem('userToken',res.token);
        }
      },
      error:(err)=>{
        this.err = err.error.error;    
      }
    })
  }

}