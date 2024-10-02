import { isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkService {
  x = inject(PLATFORM_ID)
  darkmode= signal<string>(isPlatformBrowser(this.x)?JSON.parse(window.localStorage.getItem('darkmode')??'null'):'');

  constructor() { 
    effect(()=>{
      if(isPlatformBrowser(this.x)){
        window.localStorage.setItem('darkmode', JSON.stringify(this.darkmode()))
      }
    })
  }
  
 
  updateMode(){
    this.darkmode.update((val)=>val === 'dark'?'null':'dark');
  }
}
