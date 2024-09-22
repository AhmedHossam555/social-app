import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/users/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  
  constructor(private flowbiteService: FlowbiteService, private _auth: AuthService,private _router: Router){

  }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
    });
  }
  signUpForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null,[Validators.required]),
    rePassword: new FormControl(null, [Validators.required]),
    dateOfBirth: new FormControl(null, Validators.required),
    gender: new FormControl(null),
  })
  onSubmit(){
    console.log(this.signUpForm.value)
    this._auth.signUp(this.signUpForm.value).subscribe({
      next: (res)=>{
        if(res.message == 'success'){
          this._router.navigate(['/login'])
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
