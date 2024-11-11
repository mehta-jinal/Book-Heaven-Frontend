import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showRegister = false;
  registerForm: FormGroup;
  loginForm: FormGroup;

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      this.http.post<any>('http://localhost:1003/users/register', formData).subscribe(
        response => {
          alert('Signed Up successfully!');
          this.toggleRegister(); // Switch to the login form after successful signup
        },
        error => {
          console.error('Error:', error);
          alert('Error during registration');
        }
      );
    }
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.http.post<any>('http://localhost:1003/users/login', loginData).subscribe(
        response => {
          alert('Signed In Successfully!');
          localStorage.setItem('jwtToken', response.token);
          document.getElementById('auth-modal')?.click(); // Close modal
          window.location.href = '/'; // Redirect to the original page
        },
        error => {
          console.error('Login error', error);
          alert('Invalid credentials');
        }
      );
    }
  }

  toggleRegister() {
    this.showRegister = !this.showRegister;
  }
}
