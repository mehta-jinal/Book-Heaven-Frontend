import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder,ReactiveFormsModule, FormGroup, FormsModule, Validators } from '@angular/forms';
import {RegisterComponent} from '../register/register.component'

@Component({
  selector: 'app-singlebook',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink, FormsModule, ReactiveFormsModule, RegisterComponent],
  templateUrl: './singlebook.component.html',
  styleUrls: ['./singlebook.component.css']
})
export class SinglebookComponent implements OnInit {

  public book: any;  // Store a single book
  private bookId: string | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router1: Router, private fb:FormBuilder) { }

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
}



