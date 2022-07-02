import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponseDTO } from 'src/app/model/UserResponseDTO';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  usuarioLogado: Observable<UserResponseDTO>;

  ngOnInit(): void {
    this.usuarioLogado = new Observable<UserResponseDTO>();
  }
}