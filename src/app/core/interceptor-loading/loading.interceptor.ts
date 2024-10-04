import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const _spinner = inject( NgxSpinnerService);
  if(!req.url.includes('profile-data')){
    _spinner.show()
  }
  return next(req).pipe(finalize(()=>{
    if(!req.url.includes('profile-data')){
      _spinner.hide()
    }
  }));
};
