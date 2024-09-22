import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(@Inject(PLATFORM_ID) private plat:object) { }

  getPlatfromId():boolean{
    if(isPlatformBrowser(this.plat)){
      return true;
    }else{
      return false;
    }
  }
}
