import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Component} from '@angular/core';

@Component({
  selector: 'dialog-animations-example',
  styleUrls: ['dialog-animations-example.css'],
  templateUrl: 'dialog-animations-example.html',
})
export class ConfirmWindow {
  constructor(public dialog: MatDialog) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ConfirmDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.html',
})
export class ConfirmDialog {
  constructor(public dialogRef: MatDialogRef<ConfirmDialog>) {}
}