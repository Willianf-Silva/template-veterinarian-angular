import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fromEvent, merge, Observable } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/shared/generic-form-validation';
import { VeterinarianResponseDTO } from 'src/app/model/dto/response/VeterinarianResponseDTO';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { UserService } from '../../user.service';
import { VeterinarianRequestDTO } from 'src/app/model/dto/request/VeterinarianRequestDTO';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, AfterViewInit {

  cadastroForm: FormGroup;
  usuario: VeterinarianRequestDTO;
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  @Input()
  usuarioLogado: Observable<VeterinarianResponseDTO>;

  //Obtendo uma lista com os elementos do formulário
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UserService,
    private alertModalService: AlertModalService
  ) {
    this.construirMensagemValidacao();
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.construirFormularioPreenchido();
  }

  ngAfterViewInit(): void {
    this.validarFormulario();
  }

  public adicionarAlterarUsuario() {
    if (this.cadastroForm.valid && this.cadastroForm.dirty) {
      let usuarioLogadoId: number = 0;
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);
      /*      
            if(this.usuarioEstaLogado()){
              usuarioLogadoId = this.usuarioLogado.id
              this.usuario.username = this.usuarioLogado.username
            }
      */
      this.usuarioService.createUpdate(usuarioLogadoId, this.usuario).subscribe(resposta => {
        this.usuario = resposta
        this.alertModalService.showAlertSuccess('Operação realizada com sucesso!')
      },
        error => {
          this.alertModalService.showAlertDanger(error.statusText);
        });

      this.cadastroForm.reset();
      this.router.navigate(['/home']);
    }
  }

  private inicializarFormulario() {
    let senha = new FormControl('', [Validators.required,
    Validators.minLength(6), Validators.maxLength(15)]);

    let senhaConfirm = new FormControl('', [Validators.required,
    Validators.minLength(6), Validators.maxLength(15)]);

    this.cadastroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      usuario: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      senha: senha,
      senhaConfirmacao: senhaConfirm
    });
  }

  private construirFormularioPreenchido() {
    this.usuarioLogado.subscribe(
      data => {
        this.cadastroForm.setValue({
          name: data.firstName,
          email: data.email,
          usuario: data.username,
          senha: '',
          senhaConfirmacao: '',
        });
        this.cadastroForm.get('usuario')?.disable();
      },
      error => {
        
      });
  }

  private construirMensagemValidacao() {
    this.validationMessages = {
      name: {
        required: 'Nome é obrigatório',
        minlength: 'O nome precisa ter no mínimo 6 caracteres',
        maxlength: 'O nome precisa ter no máximo 15 caracteres'
      },
      email: {
        required: 'E-mail é obrigatório',
        email: 'E-mail inválido'
      },
      usuario: {
        required: 'Usuário é obrigatório',
        minlength: 'O usuário precisa ter no mínimo 6 caracteres',
        maxlength: 'O usuário precisa ter no máximo 15 caracteres'
      },
      senha: {
        required: 'Senha é obrigatório',
        minlength: 'A senha precisa ter no mínimo 6 caracteres',
        maxlength: 'A senha precisa ter no máximo 15 caracteres'
      },
      senhaConfirmacao: {
        required: 'Informe a senha novamente',
        minlength: 'A senha precisa ter no mínimo 6 caracteres',
        maxlength: 'A senha precisa ter no máximo 15 caracteres'
      }
    };
  }

  private validarFormulario() {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
    });
  }
}