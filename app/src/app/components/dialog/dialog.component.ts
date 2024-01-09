import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserTableComponent } from '../user-table/user-table.component';
import { timer } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  constructor(public dialogRef: MatDialogRef<DialogComponent>) { }
  isUserInput = '';
  isClicked = false;

  saveUser() {
    this.isClicked = true;

    // Using RxJS timer for managing timeouts
    const resetClickedStatus = timer(2000);
    const resetUserInput = timer(2500);
    const closeDialogTimer = timer(3000);

    resetClickedStatus.subscribe(() => {
      this.isClicked = false;
    });

    resetUserInput.subscribe(() => {
      this.isUserInput = '';
    });

    closeDialogTimer.subscribe(() => {
      this.dialogRef.close();
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
