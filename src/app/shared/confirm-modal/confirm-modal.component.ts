import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title: string;
  @Input() mensagem: string;
  @Input() cancelTxt = 'Cancelar';
  @Input() confirmTxt = 'Confirmar'
  
  confirmResult: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.confirmResult = new Subject();
  }

  onConfirm(){
    this.confirmarFechar(true);
  };

  onClose(){
    this.confirmarFechar(false);
  };

  private confirmarFechar(valor: boolean){
    this.confirmResult.next(valor);
    this.bsModalRef.hide();
  }
}