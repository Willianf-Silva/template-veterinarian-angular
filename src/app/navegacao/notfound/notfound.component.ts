import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/security/authentication.service';
import { ShowMenuService } from '../service/show-menu.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  constructor(private showMenuService:ShowMenuService) { }

  ngOnInit(): void {
    this.showMenuService.showMenuAndFooter(false);
  }
  
  activeMenuAndFooter(){
    this.showMenuService.showMenuAndFooter(true);
  }
}