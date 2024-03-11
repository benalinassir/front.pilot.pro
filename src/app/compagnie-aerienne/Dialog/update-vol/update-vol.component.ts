import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-vol',
  templateUrl: './update-vol.component.html',
  styleUrls: ['./update-vol.component.css']
})
export class UpdateVolComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdateVolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
