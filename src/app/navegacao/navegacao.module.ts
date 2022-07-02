import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CollapseModule } from 'ngx-bootstrap/collapse';

import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { ShowMenuService } from './service/show-menu.service';



@NgModule({
  declarations: [
    FooterComponent,
    HomeComponent,
    MenuComponent,
    NotfoundComponent,
    MaintenanceComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CollapseModule
  ],
  providers: [
    ShowMenuService
  ],
  exports: [
    FooterComponent,
    HomeComponent,
    MenuComponent,
    NotfoundComponent,
    MaintenanceComponent
  ]
})
export class NavegacaoModule { }
