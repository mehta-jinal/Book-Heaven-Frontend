import { Routes } from '@angular/router';
import { AboutComponent } from '../pages/about/about.component';
import { LibraryComponent } from '../pages/library/library.component';
import { ContactUsComponent } from '../pages/contact-us/contact-us.component';
import { HomeComponent } from '../pages/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
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
