import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { logoutGuard } from './core/guards/logout.guard';

export const routes: Routes = [
    {path:'', redirectTo:'posts',pathMatch:'full'},
    {path:'posts',loadComponent:()=>import('./layouts/pages/allposts/allposts.component').then((c)=>c.AllpostsComponent),canActivate:[authGuard],title:'posts'},
    {path:'profile',loadComponent:()=>import('./layouts/pages/profile/profile.component').then((c)=>c.ProfileComponent), canActivate:[authGuard],title:'profile'},
    {path:'login',loadComponent:()=>import('../app/layouts/authentication/login/login.component').then((c)=>c.LoginComponent),canActivate:[logoutGuard],title:"login"},
    {path:'register',loadComponent:()=>import('../app/layouts/authentication/register/register.component').then((c)=>c.RegisterComponent),canActivate:[logoutGuard],title:'register'},
];
