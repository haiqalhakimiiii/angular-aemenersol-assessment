import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  protected isLoading = false;
  protected errorMessage = '';

  protected loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private apiService: ApiService,
    private formBuilder: NonNullableFormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  protected onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    const { username, password } = this.loginForm.getRawValue();
    this.apiService.login(username, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.error('Login failed:', error);
      }
    });
  }
}
