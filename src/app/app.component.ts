import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { RegisterComponent } from "./layouts/authentication/register/register.component";
import { NgxSpinnerModule } from 'ngx-spinner';
import { DarkService } from './core/services/dark.service';
import {  NgClass } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegisterComponent,NgxSpinnerModule,NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'social-app';
  _mode = inject(DarkService)
  constructor(private flowbiteService: FlowbiteService){}
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
    });
  }

  
}
