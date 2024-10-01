import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkService {
  darkmode:WritableSignal<string> = signal('null')

  constructor() { }
  updateMode(){
    this.darkmode.update((val)=>val === 'dark'?'null':'dark');
  }
}
