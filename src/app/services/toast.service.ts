import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastrService: ToastrService) { }

  showSuccess(msg: string) {
    this.toastrService.success(msg, 'Succès');
  }

  showInfo(msg: string) {
    this.toastrService.info(msg, 'Info');
  }

  showWarn(msg: string) {
    this.toastrService.warning(msg, 'Attention');
  }

  showError(msg: string) {
    this.toastrService.error(msg, 'Erreur');
  }
}
