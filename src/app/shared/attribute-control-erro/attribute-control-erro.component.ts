import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-attribute-control-erro',
  templateUrl: './attribute-control-erro.component.html',
  styleUrls: ['./attribute-control-erro.component.css']
})
export class AttributeControlErroComponent implements OnInit {

  @Input() mostrarErro: boolean = false;
  @Input() msgErro: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
