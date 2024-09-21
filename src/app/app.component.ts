import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { HeaderComponent } from '../designs/header/header.component';
// import { FooterComponent } from '../designs/footer/footer.component';
import { NavbarComponent } from '../designs/navbar/navbar.component';
import { TestComponent } from '../pages/test/test.component';
import { FooterComponent } from '../designs/footer/footer.component';
import { ContactUsComponent } from '../pages/contact-us/contact-us.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, TestComponent,FooterComponent, ContactUsComponent],
  templateUrl:'./app.component.html',
  //  `
  //   <!-- <app-navbar></app-navbar>
  //   <div class="flex-wrapper">
  //     <router-outlet></router-outlet>
  //     <div class="container">
  //     </div>
  //     <app-footer></app-footer>
  //   </div> -->
  // `,
  styleUrl: 'app.component.css', 
  // `
  //   .flex-wrapper {
  //     display: flex;
  //     min-height: 92.5vh;
  //     flex-direction: column;
  //     justify-content: space-between;
  //   }
  // `,
})
export class AppComponent {
  title = 'webapp';
}
