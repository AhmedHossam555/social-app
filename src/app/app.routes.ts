import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {path:'', redirectTo:'posts',pathMatch:'full'},
    {path:'posts',loadComponent:()=>import('../app/layouts/pages/posts/posts.component').then((c)=>c.PostsComponent),canActivate:[authGuard],title:'posts'},
    {path:'login',loadComponent:()=>import('../app/layouts/authentication/login/login.component').then((c)=>c.LoginComponent),title:"login"},
    {path:'register',loadComponent:()=>import('../app/layouts/authentication/register/register.component').then((c)=>c.RegisterComponent),title:'register'},
];
