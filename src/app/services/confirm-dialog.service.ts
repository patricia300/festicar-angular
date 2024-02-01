import { Injectable } from '@angular/core';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(private confirmService: ConfirmationService) {}

  confirm(title: string, question: string, accept: () => void, reject = () => {}) {
    this.confirmService.confirm({
      header: title,
      message: question,
      icon: 'pi pi-info-circle',
      accept,
      reject: (type: ConfirmEventType) =>  {
        switch(type) {
          case ConfirmEventType.REJECT:
            reject();
            break;
          case ConfirmEventType.CANCEL:
            break;
        }
      }
    });
  }

}
