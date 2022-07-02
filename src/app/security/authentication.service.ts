import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../model/LoginResponse';
import { ShowMenuService } from '../navegacao/service/show-menu.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AlertModalService } from '../shared/alert-modal.service';
import { mensagemErro } from '../shared/utils';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  protected urlOAuthAutentication: string = `${environment.oAuthAutentication}/oauth/token`;
  protected clientId: string = `${environment.clientId}`;
  protected clientSecret: string = `${environment.clientSecret}`;
  protected jwtPayload: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private showMenuService: ShowMenuService,
    private alertService: AlertModalService
  ) {
    this.carregarToken();
  }

  async autenticar(usuario: string, senha: string) {
    await this.validarUsuario(usuario, senha).then(() => {
      this.router.navigate(['/home']);
      this.liberarMenuRodape(true);
    }).catch(error => {
      this.alertService.showAlertDanger(mensagemErro(error));
    });
  }

  async validarUsuario(usuario: string, senha: string): Promise<void> {

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.clientId + ':' + this.clientSecret) })
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    const dadosApi = await this.http.post<LoginResponse>(this.urlOAuthAutentication, body, { headers, withCredentials: true })
      .toPromise().then(response => {
        this.armazenarToken(response.access_token);
      });
  }

  public isUserLoggedIn() {
    const username: string = this.getPayload()?.user_name;
    const isUserPresent: boolean = username != null;
    
    this.liberarMenuRodape(isUserPresent);
    return isUserPresent
  }

  public isAccessTokenInvalido(): boolean{
    const token = localStorage.getItem('access_token');
    return !token || helper.isTokenExpired(token?.toString());
  }

  public encerrarSessao(): void {
    sessionStorage.clear();
    this.liberarMenuRodape(false);
    this.router.navigate(['/login']);
  }

  public getPayload(): any {
    return this.jwtPayload;
  }

  public async refreshToken(): Promise<void>{
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.clientId + ':' + this.clientSecret) })
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = `grant_type=refresh_token`;

    const dadosApi = await this.http.post<LoginResponse>(this.urlOAuthAutentication, body, { headers, withCredentials: true })
    .toPromise().then(response => {
        this.armazenarToken(response.access_token);
    }).catch( error =>{
      this.encerrarSessao();
      this.alertService.showAlertDanger(mensagemErro(error));
    });
  }

  private liberarMenuRodape(liberar: boolean) {
    this.showMenuService.showMenuAndFooter(liberar);
  }

  private armazenarToken(token: string) {
    this.jwtPayload = helper.decodeToken(token);
    localStorage.setItem('access_token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('access_token');

    if (token) {
      this.armazenarToken(token);
    }
  }
}