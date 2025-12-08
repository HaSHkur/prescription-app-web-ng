import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { AuthServiceService } from '../../../services/auth/auth-service.service';

type NavItem = { label: string; icon: string; path: string; title?: string };

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Output() toggle = new EventEmitter<void>();
  @Output() closeOnMobile = new EventEmitter<void>();

  private breakpointObserver = inject(BreakpointObserver);
  private authService = inject(AuthServiceService);
  private router = inject(Router);

  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  nav: NavItem[] = [
    { label: 'Home', icon: 'home', path: '/prescriptions' },
    { label: 'Add Prescription', icon: 'add_circle', path: '/prescriptions/create' },
    { label: 'Report', icon: 'assessment', path: '/settings' }
  ];

  onToggle() {
    this.toggle.emit();
  }

  handleLinkClick() {
    this.closeOnMobile.emit();
  }

  onLogout() {
    this.authService.logout(); // Clear session
    this.router.navigate(['/login']); // Redirect to login
  }
}