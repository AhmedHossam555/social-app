import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logoutGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router);
  let _plat = inject(PLATFORM_ID);
  if(isPlatformBrowser(_plat)){
    if(window.localStorage.getItem('userToken')!==null){
      _router.navigate([window.localStorage.getItem('currentPage')]);
      return false;
    }else{
      return true;
    }
  }
  return true;
};
