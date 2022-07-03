import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { VeterinarianRequestDTO } from "../model/dto/request/VeterinarianRequestDTO";
import { VeterinarianResponseDTO } from "../model/dto/response/VeterinarianResponseDTO";
import { AuthenticationService } from "../security/authentication.service";
import { AlertModalService } from "../shared/alert-modal.service";
import { mensagemErro, retryWithDelay } from "../shared/utils";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected urlServiceV1: string = `${environment.urlServiceV1}/veterinarians`;

  constructor(
    public http: HttpClient,
    private authenticationService: AuthenticationService,
    private alertService: AlertModalService
  ) { }

  createUpdate(idUsuario: number, usuario: VeterinarianRequestDTO): Observable<any> {
    if (idUsuario === null) {
      const headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

      return this.http
        .post(this.urlServiceV1, usuario, { headers })
        .pipe(retryWithDelay(1000,3),
          catchError(error => {
            this.alertService.showAlertDanger(mensagemErro(error));
            return EMPTY
          })
        );
    } else {
      return this.http
        .put(this.urlServiceV1 + "/" + idUsuario, usuario)
        .pipe(retryWithDelay(1000,3),
          catchError(error => {
            this.alertService.showAlertDanger(mensagemErro(error));
            return EMPTY
          })
        );
    }
  };

  obterUsuarioLogado(): Observable<VeterinarianResponseDTO> {
    const username: string = this.authenticationService.getPayload()?.user_name;
    return this.http.get<any>(this.urlServiceV1 + "/login/" + username)
      .pipe(retryWithDelay(1000,3),
        catchError(error => {
          this.alertService.showAlertDanger(mensagemErro(error));
          throw error
        })
      );
  };

}