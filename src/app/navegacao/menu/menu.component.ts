import { Component, OnInit } from '@angular/core';
import { ShowMenuService } from '../service/show-menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  mostrarMenu:boolean = false;

  constructor(private showMenuService:ShowMenuService) { }

  ngOnInit(): void {
    this.showMenuService.mostrarMenuEmitter.subscribe(
      menu => this.mostrarMenu = menu
    );
  }

  nav: Nav[] = [
    {
      link: '/home',
      name: 'Início',
      exact: true,
      admin: false
    },
    {
      link: '/usuarios',
      name: 'Usuário',
      exact: true,
      admin: false
    },
    {
      link: '/clientes',
      name: 'Cliente',
      exact: true,
      admin: false
    },
    {
      link: '/servicos',
      name: 'Serviço',
      exact: true,
      admin: false
    },
    {
      link: '/consultas',
      name: 'Consulta',
      exact: true,
      admin: false
    },
    {
      link: '/agendas',
      name: 'Agenda',
      exact: true,
      admin: false
    }
  ]
}
interface Nav{
  link: string,
  name: string,
  exact: boolean,
  admin: boolean
}