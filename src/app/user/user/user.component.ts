import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VeterinarianResponseDTO } from 'src/app/model/dto/response/VeterinarianResponseDTO';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  usuarioLogado$: Observable<VeterinarianResponseDTO>;
  loading$ = new BehaviorSubject<boolean>(true);

  constructor(
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    this.obterUsuarioLogado();
  }

  private obterUsuarioLogado() {
    this.usuarioLogado$ = this.userService.obterUsuarioLogado()
      .pipe(
        catchError(() => {
          this.loading$.next(false)
          return EMPTY
        })
      );
  }
}