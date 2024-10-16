import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder,ReactiveFormsModule, FormGroup, FormsModule, NgModel, Validators } from '@angular/forms';

@Component({
  selector: 'app-singlebook',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './singlebook.component.html',
  styleUrls: ['./singlebook.component.css']
})
export class SinglebookComponent implements OnInit {

  public book: any;  // Store a single book
  private bookId: string | null = null;
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

  ngOnInit(): void {
    // Fetch book ID from route parameters
    this.route.paramMap.subscribe(params => {
      this.bookId = params.get('id');  // Retrieve the bookId from the route params
      if (this.bookId) {
        // Fetch the book by its ID
        this.fetchBook(this.bookId);
      }
    });
  }

  onSubmit() {
    if(this.registerForm.valid) {
      const formData = this.registerForm.value;
  
      this.http.post<any>('http://localhost:1003/users/register', formData)
        .subscribe(
          response => {
            console.log('Success:', response);
            alert('Submitted successfully!');
            this.router1.navigate(['/']);
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
            // Save JWT token to local storage
            localStorage.setItem('jwtToken', response.token);

            // Redirect to dashboard or other protected routes
            this.router1.navigate(['/']);
          },
          error => {
            console.error('Login error', error);
            alert('Invalid credentials');
          }
        );
    }
  }

  // Fetch a single book by its ID
  fetchBook(bookId: string): void {
    this.http.get(`http://localhost:1003/books/${bookId}`)
      .subscribe((resp: any) => {
        this.book = resp;  // Set single book object
      }, (error) => {
        console.error('Error fetching book:', error);
      });
  }

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



