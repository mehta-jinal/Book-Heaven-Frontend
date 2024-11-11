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
  public languages: any[] = []; // Update to hold both id and name
  public categories: any[] = []; // Update to hold both id and c_name
  public selectedLanguages: string[] = [];
  public selectedCategories: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBooks();
    this.fetchLanguages();
    this.fetchCategories();
  }

  fetchBooks() {
    this.http.get('http://localhost:1003/books').subscribe(
      (resp: any) => {
        console.log('Books:', resp);
        this.books = resp;
        this.filteredBooks = this.books;
      },
      (error) => console.error('Error fetching books:', error)
    );
  }

  fetchLanguages() {
    this.http.get('http://localhost:1003/languages').subscribe(
      (resp: any) => {
        console.log('Languages:', resp);
        this.languages = resp.map((lang: any) => ({ id: lang._id, name: lang.name }));
      },
      (error) => console.error('Error fetching languages:', error)
    );
  }

  fetchCategories() {
    this.http.get('http://localhost:1003/categories').subscribe(
      (resp: any) => {
        console.log('Categories:', resp);
        this.categories = resp.map((cat: any) => ({ id: cat._id, name: cat.c_name }));
      },
      (error) => console.error('Error fetching categories:', error)
    );
  }

  onLanguageChange(languageId: string, event: any) {
    if (event.target.checked) {
      this.selectedLanguages.push(languageId);
    } else {
      this.selectedLanguages = this.selectedLanguages.filter((id) => id !== languageId);
    }
    this.applyFilters();
  }

  onCategoryChange(categoryId: string, event: any) {
    if (event.target.checked) {
      this.selectedCategories.push(categoryId);
    } else {
      this.selectedCategories = this.selectedCategories.filter((id) => id !== categoryId);
    }
    this.applyFilters();
  }

  applyFilters() {
    console.log('Selected Languages:', this.selectedLanguages);
    console.log('Selected Categories:', this.selectedCategories);
  
    this.filteredBooks = this.books.filter((book) => {
      const matchesLanguage =
        this.selectedLanguages.length === 0 ||
        this.selectedLanguages.includes(book.l_id);
      const matchesCategory =
        this.selectedCategories.length === 0 ||
        this.selectedCategories.includes(book.c_id);
  
      return matchesLanguage && matchesCategory;
    });
  
    console.log('Filtered Books:', this.filteredBooks);
  }
}
