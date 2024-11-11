import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormGroup, FormsModule, Validators } from '@angular/forms';
import { RegisterComponent } from '../register/register.component'

@Component({
  selector: 'app-singlebook',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule, RegisterComponent],
  templateUrl: './singlebook.component.html',
  styleUrls: ['./singlebook.component.css']
})
export class SinglebookComponent implements OnInit {

  public book: any;  // Store a single book
  private bookId: string | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router1: Router, private fb: FormBuilder) { }

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

  // Fetch a single book by its ID
  fetchBook(bookId: string): void {
    this.http.get(`http://localhost:1003/books/${bookId}`)
      .subscribe((resp: any) => {
        this.book = resp;  // Set single book object
        // Example: Assume `resp` contains a field `downloadLink`
        console.log('Fetched Book:', this.book);
      }, (error) => {
        console.error('Error fetching book:', error);
      });
  }

  onDownloadClick() {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      // User is logged in and a download link exists for this book(upar ni line ma after token lakhvanu if necessary --> && this.book && this.book.downloadLink)
      window.open(this.book.downloadLink, '_blank');
    } else {
      // User is not logged in, open login modal
      document.getElementById('auth-modal')?.click();
    }
  }
}



