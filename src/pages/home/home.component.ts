import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Keep this import for HTTP calls
import { CommonModule } from '@angular/common';
import { AboutComponent } from "../about/about.component";
import { LibraryComponent } from "../library/library.component";
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AboutComponent, CommonModule, LibraryComponent, FormsModule], // Remove HttpClientModule from here
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  data = {
    email: ''
  };
  public successMessage: string = '';
  public errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void { }

  // Email regex pattern for validation
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  onSubmit(): void {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.data.email) {
      this.errorMessage = 'Please provide a valid email.';
      return;
    } else if (!emailPattern.test(this.data.email)) {
      this.errorMessage = 'Please provide a valid email format.';
      return;
    }

    // Post data to the backend API
    this.http.post<any>('http://localhost:1003/news', this.data)
      .subscribe(
        response => {
          console.log('Success:', response);
          if (response.alreadySubscribed) {
            alert('You have already subscribed with this email!');
          } else {
            alert('Submitted successfully!');

            // Clear the form data and messages after successful submission
            this.data.email = '';       // Clear email
            this.errorMessage = '';     // Clear error message
            this.successMessage = '';   // Clear success message if needed  

            // Navigate to the home page after success
            this.router.navigate(['/']);  // Ensure correct routing
          }
        },
        error => {
          console.error('Error:', error);
          this.errorMessage = 'An error occurred during subscription.';
        }
      );
  }

}
