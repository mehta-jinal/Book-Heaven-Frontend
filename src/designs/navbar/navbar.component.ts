import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from "../../pages/register/register.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, RegisterComponent],
  templateUrl: './navbar.component.html', 
  
  styleUrl: 'navbar.component.css', 
})
export class NavbarComponent {
  isDropdownOpen: boolean = false;
  
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    console.log('Logging out...');
  }
}
