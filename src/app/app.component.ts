import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './modules/shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private router = inject(Router);
  // Inside app.component.ts
  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  showSidebar$ = this.router.events.pipe(
  filter(event => event instanceof NavigationEnd),
    map(() => {
      let route = this.router.routerState.root;
      while (route.firstChild) route = route.firstChild;
      return !route.snapshot.data['hideSidebar'];
    })
  );
}
