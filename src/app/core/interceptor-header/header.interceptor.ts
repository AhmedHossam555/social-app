import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { PlatformService } from '../services/plat/platform.service';
export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  let _plat = inject(PlatformService);
  if(req.url.includes('.com/posts') || req.url.includes('.com/comments')){
    if(_plat.getPlatfromId()){
      let token:any = {token:window.localStorage.getItem('userToken')};
      req = req.clone({
        setHeaders:token,
        })
    }
  }
  return next(req);
};
