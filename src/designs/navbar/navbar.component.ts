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
  isLoggedIn = false; // Set this based on your authentication logic
  router: any;

  // Simulate login/logout
  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
    alert('You have been successfully logged out!');
    this.router.navigate(['/']);
  }
}
