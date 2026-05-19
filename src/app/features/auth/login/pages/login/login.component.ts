import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NonNullableFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  protected formLogin = this.formBuilder.group({
    username: '',
    password: ''
  });

  constructor(private authService: AuthService,
    private formBuilder: NonNullableFormBuilder
  ) { }

  protected login(): void {
    this.authService.login(this.formLogin.controls.username.value, this.formLogin.controls.password.value).subscribe();
  }
}
