import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder:FormBuilder,
    private authentication:AuthenticationService) {}

  ngOnInit(): void {
    this.iniciarFormulario();
  }
  onSubmit() {
    let usuario:string = this.loginForm.value['usuario'];
    let senha:string = this.loginForm.value['senha'];
    
    this.fazerLogin(usuario, senha);
    this.resetar();
  }

  fazerLogin(usuario: string, senha: string) {
    this.authentication.autenticar(usuario, senha)
  }

  resetar(){
    // Limpa o formulário html
    this.loginForm.reset();
  }

  private iniciarFormulario() {
    this.loginForm = this.formBuilder.group({
      usuario: [null, Validators.required],
      senha: [null, Validators.required]
    })
  }
  
  verificaValidTouched(campo: any){
    let valido = !this.loginForm.get(campo)?.valid && this.loginForm.get(campo)?.touched
    let response: boolean = false;
    if(valido){
      response = true;
    }
    return response
  }

  aplicaCssErro(campo: any){
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }
}
