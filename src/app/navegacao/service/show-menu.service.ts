import { Injectable, EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowMenuService {
  
  mostrarMenuEmitter = new EventEmitter<boolean>();
  mostrarFooterEmitter = new EventEmitter<boolean>();
  
  constructor() { }
  
  showMenuAndFooter(show: boolean) {
    this.enableMenu(show);
    this.enableFooter(show);
  }  
  private enableMenu(show: boolean){
    this.mostrarMenuEmitter.emit(show);
  }

  private enableFooter(show: boolean){
    this.mostrarFooterEmitter.emit(show);
  }
}