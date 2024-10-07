import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  data = {
    email: ''
  };
  public successMessage: string = '';
  public errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  onSubmit(): void {
    if (!this.data.email) {
      this.errorMessage = 'Please provide a valid email.';
      return;
    }
    // Post data to the backend API
    this.http.post<any>('http://localhost:1003/register', this.data)
      .subscribe({
        next: (resp: any) => {
          this.successMessage = 'Email successfully submitted!';
          this.errorMessage = '';
        },
        error: (error) => {
          console.error(error);
          this.errorMessage = 'Error submitting your email. Please try again.';
          this.successMessage = '';
        }
      });
  }

}