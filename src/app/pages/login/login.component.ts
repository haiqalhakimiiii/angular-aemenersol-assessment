import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
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
    private formBuilder: NonNullableFormBuilder,
    private apiService: ApiService
  )
    { }

  ngOnInit(): void {
  }

  protected onSubmit(): void {
    const { email, password } = this.loginForm.getRawValue();
    this.apiService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        // Handle successful login, e.g., store token, navigate to dashboard, etc.
      },
      error: (error) => {
        console.error('Login failed:', error);
        // Handle login error, e.g., show error message to user
      }
    });
  }
}
