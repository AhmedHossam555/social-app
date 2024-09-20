import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../core/flowbite/flowbite.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  
  constructor(private flowbiteService: FlowbiteService){

  }
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
 
    });
  }
}
