import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.css'
})
export class DeleteConfirmationComponent {
  isDeleteSuccessful: boolean = false;
  selectedUserId: number = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    private userService: UserService,
    private router: Router) {
    this.selectedUserId = this.data.additionalData.selectedUserId;
  }

  CloseDialog() {
    this.dialogRef.close();
  }

  DeleteAndClose() {
    this.userService.DeleteUser(this.selectedUserId).subscribe(
      (response) => {
        setTimeout(() => {
          this.isDeleteSuccessful = response;
          setTimeout(() => {
            this.dialogRef.close();
            this.router.navigate([`/users`]);
          }, 2000);  
        }, 1000);  
      });
  }
}
