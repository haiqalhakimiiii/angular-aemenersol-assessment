import { AccessTokenInterceptorProvider } from './core/interceptors/access-token.interceptor';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TopbarComponent } from './core/components/topbar/topbar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    TopbarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [AccessTokenInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
