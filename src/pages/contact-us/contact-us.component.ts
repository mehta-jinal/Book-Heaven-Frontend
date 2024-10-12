import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],  // Make sure RouterModule is imported
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      console.log('Form Submitted', formData);

      // Sending a post request
      this.http.post<any>('http://localhost:1003/contact', formData)
        .subscribe(
          response => {
            console.log('Success:', response);
            alert('Submitted successfully!');

            // Navigate to the home page after success
            this.router.navigate(['/']);  // Make sure the home route exists
          },
          error => {
            console.error('Error:', error);
          }
        );
    }
  }
}
