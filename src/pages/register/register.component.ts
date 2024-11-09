import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder,ReactiveFormsModule, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  showRegister = false;
  register: any;
  registerForm: FormGroup;
  loginForm: FormGroup;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router1: Router, private fb:FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
   }

  ngOnInit(): void { }

  onSubmit() {
    if(this.registerForm.valid) {
      const formData = this.registerForm.value;
  
      this.http.post<any>('http://localhost:1003/users/register', formData)
        .subscribe(
          response => {
            console.log('Success:', response);
            alert('Signed Up successfully!');
            // this.router1.navigate(['/']);
            // window.location.href = '#login-form';
            document.getElementById('auth-modal')?.click();
          },
          error => {
            console.error('Error status:', error.status);
            console.error('Error message:', error.message);
            console.error('Error details:', error.error);
  
            if (error.status === 500) {
              alert('Server error occurred. Please try again later.');
            } else if (error.status === 0) {
              alert('Failed to connect to the server.');
            } else {
              alert(`Error ${error.status}: ${error.message}`);
            }
          }
        );
    }
  }
  onLoginSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      // Send POST request to login API
      this.http.post<any>('http://localhost:1003/users/login', loginData)
        .subscribe(
            response => {
              console.log('Success:', response);
              alert('Signed In Successfully!');
              // window.open('https://icrrd.com/public/media', '_blank'); // Update the URL to the correct one.
              // this.router1.navigate(['/']);
              window.location.href = '/';
            },
          error => {
            console.error('Login error', error);
            alert('Invalid credentials');
          }
        );
    }
  }
  // onLoginSubmit() {
  //   if (this.loginForm.valid) {
  //     const loginData = this.loginForm.value;
  
  //     // Send POST request to login API
  //     this.http.post<any>('http://localhost:1003/users/login', loginData)
  //       .subscribe(
  //         response => {
  //           console.log('Login Success:', response);
  //           alert('Login successful!');
  
  //           // Log before navigating
  //           console.log('Attempting navigation...');
            
  //           // Attempt to navigate
  //           this.router1.navigate(['/library'])
  //             .then(success => console.log('Navigation successful:', success))
  //             .catch(err => console.error('Navigation error:', err));
  //         },
  //         error => {
  //           console.error('Login error:', error);
  //           alert('Invalid credentials');
  //         }
  //       );
  //   }
  // }

  // Method to handle download button click
  onDownloadClick() {
    const token = localStorage.getItem('jwtToken'); // Check if JWT token exists in localStorage or sessionStorage

    if (token) {
      // If JWT token exists, redirect to download page
      window.location.href = '/download'; // Or the actual download URL
    }
    else {
      // If no token, redirect to login page
      // SinglebookComponent.router1.navigate(['/login']);
      window.location.href = '/register';
      // SinglebookComponent.arguments.router1.navigate(['/register']);
    }
  }

  toggleRegister() {
    this.showRegister = !this.showRegister;  
    
  }
}
function onDownloadClick() {
  throw new Error('Function not implemented.');
}



