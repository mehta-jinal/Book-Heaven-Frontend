import { Routes } from '@angular/router';
import { AboutComponent } from '../pages/about/about.component';
import { LibraryComponent } from '../pages/library/library.component';
import { ContactUsComponent } from '../pages/contact-us/contact-us.component';
import { TestComponent } from '../pages/test/test.component';
// import { HomeComponent } from '../pages/home/home.component';
// import { NavbarComponent } from '../designs/navbar/navbar.component';

export const routes: Routes = [
    {
        path: '',
        component: TestComponent
    },
    {
        path: 'library',
        component: LibraryComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'contact',
        component: ContactUsComponent
    },
    
];
