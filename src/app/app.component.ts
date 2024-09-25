import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RegisterComponent } from "./layouts/authentication/register/register.component";
import { UserService } from './core/services/users/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegisterComponent],
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
