export interface ConfirmationDialogData {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  type: 'warn' | 'info'; // For color/icon styling
}