
import { MonoTypeOperatorFunction } from 'rxjs';
import { delay as delayOperator, retryWhen, scan, tap } from 'rxjs/operators';

export function retryWithDelay<T>(
  delay: number,
  count = 1
): MonoTypeOperatorFunction<T> {
  return (input) =>
    input.pipe(
      retryWhen((errors) =>
        errors.pipe(
          scan((acc, error) => ({ count: acc.count + 1, error }), {
            count: 0,
            error: undefined as any,
          }),
          tap((current) => {
            if (current.count > count) {
              throw current.error;
            }
          }),
          delayOperator(delay)
        )
      )
    );
}

export function mensagemErro(error: any): string {
  let codigo = error.status
  let mensagem: string;

  if (codigo == 0) {
    mensagem = 'Serviço indisponível. Tente novamente mais tarde.'
  } else if (codigo == 401) {
    mensagem = 'Erro na autenticação do usuário ou sessão expirada'
  } else if (codigo == 400 && error.error.error === 'invalid_grant') {
    mensagem = 'Usuário e/ou senha incorretos. Informe os dados novamente.'
  } else {
    mensagem = error.error[0].mensagemUsuario;
  }

  return mensagem;
}