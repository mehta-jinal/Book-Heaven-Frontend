import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  public books: any[] = [];           // Stores all books from the API
  public filteredBooks: any[] = [];    // Stores the filtered books
  public languages: string[] = [];     // Stores available languages
  public categories: string[] = [];    // Stores available categories
  public selectedLanguages: string[] = [];   // Stores selected languages
  public selectedCategories: string[] = [];  // Stores selected categories

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch books from API
    this.http.get('http://localhost:1003/books')
      .subscribe((resp: any) => {
        this.books = resp;
        this.filteredBooks = this.books;  // Initially show all books
        this.initializeFilters();         // Extract unique languages and categories
      }, (error) => {
        console.error('Error fetching books:', error);
      });
  }

  // Initialize filters (languages and categories)
  initializeFilters() {
    this.languages = [...new Set(this.books.map(book => book.language))];
    this.categories = [...new Set(this.books.map(book => book.category))];
  }

  // Handle language checkbox change
  onLanguageChange(language: string, event: any) {
    if (event.target.checked) {
      this.selectedLanguages.push(language);
    } else {
      this.selectedLanguages = this.selectedLanguages.filter(l => l !== language);
    }
    this.applyFilters();
  }

  // Handle category checkbox change
  onCategoryChange(category: string, event: any) {
    if (event.target.checked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    }
    this.applyFilters();
  }

  // Apply filters to the book list
  applyFilters() {
    this.filteredBooks = this.books.filter(book => {
      const matchesLanguage = this.selectedLanguages.length === 0 || this.selectedLanguages.includes(book.language);
      const matchesCategory = this.selectedCategories.length === 0 || this.selectedCategories.includes(book.category);
      return matchesLanguage && matchesCategory;
    });
  }
}
