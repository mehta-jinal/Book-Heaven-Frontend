import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Keep this import for HTTP calls
import { CommonModule } from '@angular/common';
import { AboutComponent } from "../about/about.component";
import { LibraryComponent } from "../library/library.component";
import { FormsModule } from '@angular/forms';

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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  onSubmit(): void {
    if (!this.data.email) {
      this.errorMessage = 'Please provide a valid email.';
      return;
    }
    // Post data to the backend API
    this.http.post<any>('http://localhost:1003/news', this.data)
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