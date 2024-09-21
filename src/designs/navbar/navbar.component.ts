import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html', 
  
  styleUrl: 'navbar.component.css', 
  // `
  // /* Add your styles here */
  // .nav-bg{
  //   background-color: #921A40;
  // }
  // .nav-link{
  //   color: #F4D9D0;
  //   font-family: 'Poppins', sans-serif;
  // }`,
})
export class NavbarComponent {}
