import { CommonModule, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogData } from '../../../models/confirmation.model';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [
    MatDialogModule, 
    MatButtonModule, 
    CommonModule
  ],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {
  public data: ConfirmationDialogData = {
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed?',
    confirmText: 'Yes',
    cancelText: 'No',
    type: 'info'
  };

  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public injectedData: Partial<ConfirmationComponent>
  ) {
    this.data = { ...this.data, ...injectedData };
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
