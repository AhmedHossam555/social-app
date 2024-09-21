import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router);
  let _plat = inject(PLATFORM_ID);
  if(isPlatformBrowser(_plat)){
    if(window.localStorage.getItem('userToken') !== null){
      return true;
    }else{
      _router.navigate(['/login']);
      return false;
    }
  }else{
    return false;
  }

};
