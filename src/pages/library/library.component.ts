import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [HttpClientModule, CommonModule],  // Ensure CommonModule is imported here
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  public books: any[] = [];
  public filteredBooks: any[] = [];
  public languages: any[] = [];
  public categories: any[] = [];
  public selectedLanguages: string[] = [];
  public selectedCategories: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBooks();
    this.fetchLanguages();
    this.fetchCategories();
  }

  fetchBooks() {
    this.http.get('http://localhost:1003/books').subscribe((resp: any) => {
      console.log('Books:', resp);
      this.books = resp;
      this.filteredBooks = this.books;
    }, error => {
      console.error('Error fetching books:', error);
    });
  }

  fetchLanguages() {
    this.http.get('http://localhost:1003/languages').subscribe((resp: any) => {
      console.log('Languages:', resp);
      this.languages = resp.map((lang: any) => lang.name);
    }, error => {
      console.error('Error fetching languages:', error);
    });
  }

  fetchCategories() {
    this.http.get('http://localhost:1003/categories').subscribe((resp: any) => {
      console.log('Categories:', resp);
      this.categories = resp.map((cat: any) => cat.c_name);
    }, error => {
      console.error('Error fetching categories:', error);
    });
  }

  onLanguageChange(language: string, event: any) {
    if (event.target.checked) {
      this.selectedLanguages.push(language);
    } else {
      this.selectedLanguages = this.selectedLanguages.filter(lang => lang !== language);
    }
    this.applyFilters();
  }

  onCategoryChange(category: string, event: any) {
    if (event.target.checked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(cat => cat !== category);
    }
    this.applyFilters();
  }

  applyFilters() {
    this.filteredBooks = this.books.filter(book => {
      const matchesLanguage = this.selectedLanguages.length === 0 || this.selectedLanguages.includes(book.language);
      const matchesCategory = this.selectedCategories.length === 0 || this.selectedCategories.includes(book.category);
      return matchesLanguage && matchesCategory;
    });
  }
}