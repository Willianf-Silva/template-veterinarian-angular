import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { UserGuard } from '../guard/user-guard';
import { RegisterComponent } from './register/register/register.component';
import { FormComponent } from './register/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { CustomFormsModule } from 'ng2-validation';



@NgModule({
  declarations: [
    UserComponent,
    RegisterComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    UserGuard,
    UserService
  ],
  exports:[
    UserComponent,
    RegisterComponent,
    FormComponent
  ]
})
export class UserModule { }
