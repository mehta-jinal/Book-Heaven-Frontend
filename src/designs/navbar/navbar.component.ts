import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html', 
  
  styleUrl: 'navbar.component.css', 
})
export class NavbarComponent {
  isDropdownOpen: boolean = false;
  isDarkTheme = false;  // Track the current theme

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Toggle the theme between dark and light
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    
    const rootElement = document.documentElement;

    if (this.isDarkTheme) {
      rootElement.classList.add('dark');
    } else {
      rootElement.classList.remove('dark');
    }
  }

  logout() {
    console.log('Logging out...');
  }
}
