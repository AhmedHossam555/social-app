import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RegisterComponent } from "./layouts/authentication/register/register.component";
import { UserService } from './core/services/users/user.service';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegisterComponent,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'social-app';
  constructor(private flowbiteService: FlowbiteService){}
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
 
    });
   
  }

  
}
