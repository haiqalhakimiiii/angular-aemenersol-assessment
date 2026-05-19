import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LOGIN_ROUTES } from 'src/app/features/auth/login/login-routing.module';

const routes: Routes = [...LOGIN_ROUTES];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthLayoutRoutingModule {}
