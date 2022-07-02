import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { LoginComponent } from './login/login.component';

import { SharedModule } from '../shared/shared.module';

import { AuthenticationService } from './authentication.service';
import { TokenService } from './token.service';

export function jwtOptionsFactory(tokenService: TokenService) {
  return {
    tokenGetter: () => {
      return tokenService.getAsyncToken();
    },
    allowedDomains: [
      `${environment.domain}`
    ],
    disallowedRoutes: [
      `${environment.oAuthAutentication}/oauth/token`
    ]
  }
};

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [TokenService]
      }
    })
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    AuthenticationService,
    TokenService
  ]
})
export class SecurityModule { }
