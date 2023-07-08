import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Users } from 'src/app/users/users/users';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  error: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: Users }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  resetPassword(): void {
    if (!this.newPassword || !this.confirmPassword) {
      this.error = 'Please enter a new password and confirm it.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    // Implement reset password logic here
    console.log('Password reset');
    this.closeDialog();
  }

}
