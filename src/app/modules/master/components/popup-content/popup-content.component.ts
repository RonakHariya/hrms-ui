import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { RoleService } from '../../services/role.service';
import { Router } from '@angular/router';
import { ApiResponse } from '../../models/response';
@Component({
  selector: 'app-popup-content',
  templateUrl: './popup-content.component.html',
  styleUrls: ['./popup-content.component.scss'],
})
export class PopupContentComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupContentComponent>
  ) {}

  cancelOperation() {
    this.dialogRef.close();
  }
}
