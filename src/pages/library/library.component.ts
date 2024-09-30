import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';  // <-- Add this

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [HttpClientModule, CommonModule],  // <-- Include CommonModule here
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  public books: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:1003/books')
      .subscribe((resp: any) => {
        this.books = resp;
      }, (error) => {
        console.error('Error fetching books:', error);
      });
  }
}
