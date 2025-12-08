import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Prescription } from '../../../models/prescription.model';
import { ActivatedRoute } from '@angular/router';
import { PrescriptionsServiceService } from '../../../services/prescriptions/prescriptions-service.service';

@Component({
  selector: 'app-prescriptions-details',
  imports: [
    CommonModule, 
    MatCardModule, 
    MatDividerModule, 
    MatIconModule, 
    MatChipsModule
  ],
  templateUrl: './prescriptions-details.component.html',
  styleUrl: './prescriptions-details.component.css'
})

export class PrescriptionsDetailsComponent {
  prescriptionDetails: Prescription | null = null;

  constructor(
    private route: ActivatedRoute,
    private prescriptionService: PrescriptionsServiceService
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
}
