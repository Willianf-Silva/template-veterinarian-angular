import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { AuthenticationGuard } from './guard/authentication.guard';
import { UserGuard } from './guard/user-guard';
import { LoginComponent } from './security/login/login.component';
import { HomeComponent } from './navegacao/home/home.component';
import { NotfoundComponent } from './navegacao/notfound/notfound.component';
import { UserComponent } from './user/user/user.component';
import { RegisterComponent } from './user/register/register/register.component';

const rootRouterConfig: Routes = [
    { path: '', component: HomeComponent,
        canActivate: [AuthenticationGuard],
    },
    { path: 'home', component: HomeComponent,
        canActivate: [AuthenticationGuard]
    },
    { path: 'usuarios', component: UserComponent,
        canActivate: [AuthenticationGuard],
        canActivateChild: [UserGuard]
    },
    { path: 'novousuario', component: RegisterComponent,
        canActivate: [AuthenticationGuard],
        canActivateChild: [UserGuard]
    },
    { path: 'login', component: LoginComponent
    },

    { path: '**', component: NotfoundComponent,
        canActivate: [AuthenticationGuard]
    } //Sempre tem que ser o último componente a ser declarado
];

@NgModule({
    imports:[
        RouterModule.forRoot(rootRouterConfig, { enableTracing: false, scrollPositionRestoration: 'enabled' })
    ],
    exports:[
        RouterModule
    ]
})

export class AppRoutingModule{}