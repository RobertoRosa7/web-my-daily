import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAlert } from '../../../interface/dialogs.interface';

@Component({
  selector: 'app-dialog-alert',
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions class="action-alert">
      <button class="submit" style="flex: 1;" mat-button [mat-dialog-close]="true">
        {{ data.actions.messageAction }}
      </button>
      <button style="flex: 1;" class="close" mat-button [mat-dialog-close]="false">
        {{ data.actions.messageClose }}
      </button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class DialogAlertComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogAlert) {}
}
