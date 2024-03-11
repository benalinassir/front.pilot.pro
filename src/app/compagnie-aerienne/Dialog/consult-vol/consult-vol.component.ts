import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-consult-vol',
  templateUrl: './consult-vol.component.html',
  styleUrls: ['./consult-vol.component.css']
})
export class ConsultVolComponent {
  constructor(
    public dialogRef: MatDialogRef<ConsultVolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
