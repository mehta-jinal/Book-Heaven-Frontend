import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import { constructor } from 'jasmine'
import { CommonapiService } from '../../services/commonapi.service';

@Component({
  selector: 'app-singlebook',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink, FormsModule],
  templateUrl: './singlebook.component.html',
  styleUrls: ['./singlebook.component.css']
})
export class SinglebookComponent implements OnInit {

  public book: any;  // Store a single book
  private bookId: string | null = null;
  register: any;

  constructor(private http: HttpClient, private route: ActivatedRoute , private router1: Router) { }

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
      }, (error) => {
        console.error('Error fetching book:', error);
      });
  }
  
  // Method to handle download button click
  onDownloadClick(){
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
  
  
}
  
  
  function onDownloadClick() {
  throw new Error('Function not implemented.');
}

