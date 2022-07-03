import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { VeterinarianResponseDTO } from 'src/app/model/dto/response/VeterinarianResponseDTO';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  usuarioLogado: Observable<VeterinarianResponseDTO>;

  ngOnInit(): void {
    this.usuarioLogado = new Observable<VeterinarianResponseDTO>();
  }
}