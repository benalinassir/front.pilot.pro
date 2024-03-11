import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vol } from '../../models/vols/vols.model';

@Component({
  selector: 'app-delete-vol',
  templateUrl: './delete-vol.component.html',
  styleUrls: ['./delete-vol.component.css']
})
export class DeleteVolComponent {
  public myvol!: Vol;
  constructor(
    public dialogRef: MatDialogRef<DeleteVolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.myvol = data.vol.numvol;
    console.log(this.myvol);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
  public onDeleteClick(): void {
    this.dialogRef.close('OK');
  }
}
