import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthModule } from '../../auth/auth.module';
import { AuthServiceService } from '../../../services/auth/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Prescription } from '../../../models/prescription.model';
import { PrescriptionsServiceService } from '../../../services/prescriptions/prescriptions-service.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-prescriptions-form',
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
    MatOptionModule,
    MatSelectModule
    ],
  templateUrl: './prescriptions-form.component.html',
  styleUrl: './prescriptions-form.component.css'
})


export class PrescriptionsFormComponent implements OnInit{
  currentDate: Date = new Date();
  prescriptionForm!: FormGroup
  genderSelectItems: { label: string; value: String | null }[] = [
      { label: 'Select Gender', value: null }
    ];
  
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private prescriptionsService: PrescriptionsServiceService
  ){}

  ngOnInit(): void {
    this.preparegenderSelectItems();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchPrescriptionDataById(id);
      }else{
        this.preparePrescriptionForm();
      }
    });
  }

  preparegenderSelectItems(): void {
    const genders = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' }
    ];
    this.genderSelectItems.push(...genders);
  }

  preparePrescriptionForm(data?:Prescription): void {
    this.prescriptionForm = this.formBuilder.group({
      prescriptionDate: [data?.prescriptionDate ?? new Date(), [Validators.required]],
      patientName: [data?.patientName ?? '', [Validators.required]],
      patientAge: [
        data?.patientAge ?? '', 
        [Validators.required, Validators.min(.0001), Validators.max(120), Validators.pattern('^[0-9]*$')]
      ],
      patientGender: [data?.patientGender ?? '', [Validators.required]],
      diagnosis: [data?.diagnosis ?? ''],
      medicines: [data?.medicines ?? ''],
      nextVisitDate: [data?.nextVisitDate ?? '']
    });
  }

  fetchPrescriptionDataById(id:string): void{
    if(!id) return;
    this.prescriptionsService.getPrescriptionById(+id).subscribe({
      next: (data) => {
        this.preparePrescriptionForm(data);
      },
      error: (error) => {
        console.error('Error fetching prescription by id:', error);
      }
    });
  }

  resetForm(){
    this.prescriptionForm.reset();
  }

  goBack(): void {
    this.router.navigate(['/prescriptions/list']);
  }

  onSubmit(): void {
    if (this.prescriptionForm.invalid) {
      return;
    }

    const prescriptionData: Prescription = this.prescriptionForm.value;

    this.prescriptionsService.createPrescription(prescriptionData).subscribe({
      next: (response) => {
        this.router.navigate(['/prescriptions/list']);
      },
      error: (error) => {
        console.error('Error creating prescription:', error);
      }
    });
  }
}
