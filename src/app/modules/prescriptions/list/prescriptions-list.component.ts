import { Component } from '@angular/core';
import { AuthModule } from '../../auth/auth.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrescriptionSummary } from '../../../models/prescription.model';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../../services/auth/auth-service.service';
import { PrescriptionsServiceService } from '../../../services/prescriptions/prescriptions-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-prescriptions-list',
  imports: [
    AuthModule,
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatTableModule,
    RouterModule,
    MatSidenavModule,
    MatPaginatorModule
  ],
  templateUrl: './prescriptions-list.component.html',
  styleUrl: './prescriptions-list.component.css'
})
export class PrescriptionsListComponent {
  
  prescriptions: PrescriptionSummary[] = [];
  searchForm!: FormGroup;
  error: string = '';

  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 5;

  displayedColumns: string[] = ['id', 'date', 'patient', 'age'];
  sidebarOpened: boolean = true;


  constructor(
    private prescriptionsService: PrescriptionsServiceService,
    private router: Router,
    private authService: AuthServiceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.prepareSearchForm();
    this.loadPrescriptions(true);
  }

  prepareSearchForm(): void {
    this.searchForm = this.formBuilder.group({
      fromDate: [''],
      toDate: ['']
    });
  }

  loadPrescriptions(isInitialSearch?:boolean): void {

    if (isInitialSearch) {
      this.getAllPrescriptions();
      return;
    }

    this.error = '';

    const fromValue = this.searchForm.get('fromDate')?.value;
    const toValue = this.searchForm.get('toDate')?.value;

    if (!fromValue || !toValue) {
      this.error = 'Both From Date and To Date are required for search.';
      return;
    }

    const fromDate = new Date(fromValue);
    const toDate = new Date(toValue);

    if (toDate < fromDate) {
      this.error = 'To Date must be after From Date.';
      return;
    } 

    this.searchPrescriptions(fromDate, toDate);
  }

  searchPrescriptions(fromDate:Date, toDate:Date): void {
    this.prescriptionsService.getAllPrescriptionsByDateRange(fromDate, toDate, this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.prescriptions = data?.content || [];
        this.totalElements = data.totalElements || 0;
        this.totalPages = data.totalPages || 0;
      },
      error: (error) => {
        console.error('Error searching prescriptions:', error);
      }
    });
  }

  getAllPrescriptions(): void {
    this.prescriptionsService.getAllPrescriptions(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.prescriptions = data.content || [];
        this.totalElements = data.totalElements || 0;
        this.totalPages = data.totalPages || 0;
      },
      error: (error) => {
        console.error('Error fetching prescriptions:', error);
      }
    });
  }

  resetSearch(): void {
    this.searchForm.reset();
    this.error = '';
    this.currentPage = 0;
    this.loadPrescriptions();
  }

  pageChanged(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    const fromValue = this.searchForm.get('fromDate')?.value;
    const toValue = this.searchForm.get('toDate')?.value;

    if (fromValue && toValue) {
      const fromDate = new Date(fromValue);
      const toDate = new Date(toValue);
      this.searchPrescriptions(fromDate, toDate);
    } else {
      this.getAllPrescriptions();
    }
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }

  hangleLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  collapsed = false;
  mobileOpen = false;

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  closeMobileSidebar() {
    this.mobileOpen = false;
  }

  toggleMobile() {
    this.mobileOpen = !this.mobileOpen;
  }

  onNavLinkClicked() {
    this.closeMobileSidebar();
  }
}
