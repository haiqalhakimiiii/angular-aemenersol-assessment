import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  protected loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  constructor(
    private apiService: ApiService,
    private formBuilder: NonNullableFormBuilder,
    private router: Router
  )
    { }

  ngOnInit(): void {
  }

  protected onSubmit(): void {
    const { email, password } = this.loginForm.getRawValue();
    this.apiService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
}
