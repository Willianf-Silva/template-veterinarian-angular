import { Component, OnInit } from '@angular/core';
import { ShowMenuService } from '../service/show-menu.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  mostrarFooter:boolean = false;

  constructor(private showMenuService:ShowMenuService) { }

  ngOnInit(): void {
    this.showMenuService.mostrarFooterEmitter.subscribe(
      footer => this.mostrarFooter = footer
    );
  }

}
