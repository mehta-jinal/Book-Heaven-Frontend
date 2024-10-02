import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-singlebook',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './singlebook.component.html',
  styleUrls: ['./singlebook.component.css']
})
export class SinglebookComponent implements OnInit {
  public book: any;  // Store a single book

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const bookId = ':id';  // Replace with actual book ID

    // Fetch a single book by its ID
    this.http.get(`http://localhost:1003/books/${bookId}`)
      .subscribe((resp: any) => {
        this.book = resp;  // Set single book object
      }, (error) => {
        console.error('Error fetching book:', error);
      });
  }
}
