import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true,
  imports: [
    CommonModule,
  
  ]
})
export class NavbarComponent {

    isProfileMenuOpen: boolean = false;
    isMobileMenuOpen: boolean = false;
  
    constructor() {}
  
    toggleProfileMenu(): void {
      this.isProfileMenuOpen = !this.isProfileMenuOpen;
    }
  
    toggleMobileMenu(): void {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }
  
    closeDropdowns(): void {
      this.isProfileMenuOpen = false;
      this.isMobileMenuOpen = false;
    }
}
