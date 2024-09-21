import { Component, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isDashed:WritableSignal<boolean> = signal(false);
  constructor(private _auth: AuthService,private _router: Router){

  }

  signOut(){
    window.localStorage.removeItem('userToken');
    this._router.navigate(['/login'])
    this._auth.userInfo.set(null);
  }
  openDash(){
    this.isDashed.set(true);
  }
  closeDash(){
    this.isDashed.set(false);
  }
}
