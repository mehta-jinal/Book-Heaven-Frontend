import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from "../../pages/register/register.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, RegisterComponent],
  templateUrl: './navbar.component.html',

  styleUrl: 'navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('jwtToken');
  }

  toggleLogin() {
    if (this.isLoggedIn) {
      localStorage.removeItem('jwtToken'); // Logout
      this.isLoggedIn = false;
      this.router.navigate(['/']); // Navigate to home or login page
    } else {
      document.getElementById('auth-modal')?.click(); // Trigger login modal if not logged in
    }
  }
}
