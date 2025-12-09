import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Prescription } from '../../../models/prescription.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PrescriptionsServiceService } from '../../../services/prescriptions/prescriptions-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogData } from '../../../models/confirmation.model';
import { ConfirmationComponent } from '../../shared/confirmation/confirmation.component';

@Component({
  selector: 'app-prescriptions-details',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatDividerModule, 
    MatIconModule, 
    MatChipsModule,
  ],
  templateUrl: './prescriptions-details.component.html',
  styleUrl: './prescriptions-details.component.css'
})

export class PrescriptionsDetailsComponent {
  prescriptionDetails: Prescription | null = null;

  constructor(
    private route: ActivatedRoute,
    private prescriptionService: PrescriptionsServiceService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchPrescriptionDataById(id);
      }
    });
    
  }

  fetchPrescriptionDataById(id:string): void{
    if(!id) return;
    this.prescriptionService.getPrescriptionById(+id).subscribe({
      next: (data) => {
        this.prescriptionDetails = data;
      },
      error: (error) => {
        console.error('Error fetching prescription by id:', error);
      }
    });
  }

  onDelete(): void{
    if(!this.prescriptionDetails?.id) return;

    this.confirmDelete(this.prescriptionDetails.id);
  }

  editPrescription(): void{
    if(!this.prescriptionDetails?.id) return;
    this.router.navigate(['/prescriptions/edit', this.prescriptionDetails.id]);
  }

  navigateToList(): void{
    this.router.navigate(['/prescriptions/list']);
  }

  confirmDelete(id: number): void{
    const dialogData: Partial<ConfirmationDialogData> = {
      title: 'Confirm Deletion',
      message: 'This record will be permanently deleted and cannot be recovered.',
      confirmText: 'Delete',
      cancelText: 'Keep',
      type: 'warn'
    };

    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '400px', 
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.prescriptionService.deletePrescription(id.toString()).subscribe({
      next: (data) => {
        console.log('Prescription deleted successfully:', data);
        this.navigateToList();
      },
      error: (error) => {
        console.error('Error deleting prescription:', error);
      }
    });
    });
  }
}
