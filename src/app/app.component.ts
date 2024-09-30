import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../designs/navbar/navbar.component';
import { HomeComponent } from '../pages/home/home.component';
import { FooterComponent } from '../designs/footer/footer.component';
import { ContactUsComponent } from '../pages/contact-us/contact-us.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent,HomeComponent,FooterComponent, ContactUsComponent],
  templateUrl:'./app.component.html',
  styleUrl: 'app.component.css'
})
export class AppComponent {
  title = 'webapp';
}
