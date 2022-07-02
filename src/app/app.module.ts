import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';

import { UserModule } from './user/user.module';
import { NavegacaoModule } from './navegacao/navegacao.module';
import { SharedModule } from './shared/shared.module';
import { SecurityModule } from './security/security.module';

import { AuthenticationGuard } from './guard/authentication.guard';
import { UserGuard } from './guard/user-guard';
import { CustomFormsModule } from 'ng2-validation';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NavegacaoModule,
    SharedModule,
    UserModule,
    SecurityModule,
    AppRoutingModule,
    CustomFormsModule
  ],
  providers: [
    AuthenticationGuard,
    UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
