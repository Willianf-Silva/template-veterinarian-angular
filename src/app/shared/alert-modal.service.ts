import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertType } from '../model/AlertType';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: BsModalService) { }

  public showAlertDanger(mensagem: string){
    this.showAlert(AlertType.DANGER, mensagem)
  }

  public showAlertSuccess(mensagem: string){
    this.showAlert(AlertType.SUCCESS, mensagem)
  }

  showAlertInfo(mensagem: string) {
    this.showAlert(AlertType.INFO, mensagem)
  }

  public showConfirm(title: string, msg:string, confirmTxt?: string, cancelTxt?: string){
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.mensagem = msg;

    if(confirmTxt){
      bsModalRef.content.confirmTxt = confirmTxt;
    }

    if(cancelTxt){
      bsModalRef.content.cancelTxt = cancelTxt;
    }

    return (<ConfirmModalComponent>bsModalRef.content).confirmResult;
  }

  
  private showAlert(type: AlertType, mensagem: string){
    mensagem = this.construirMensagemPadrao(mensagem);
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = mensagem;
  }
  
  private construirMensagemPadrao(mensagem: string): string {
    if(mensagem == 'Unknown Error'){
      mensagem = 'Serviço indisponível. Tente novamente mais tarde.'
    }
    return mensagem;
  }

}