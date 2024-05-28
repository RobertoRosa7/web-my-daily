import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarActions, dialogData } from '../../interfaces/dialogs/dialogs.interface';
import { ProfileHappen } from '../../interfaces/happens/profile.happen.interface';
import { FollowerPipe } from '../../pipes/followers/follwers.pipe';
import { DialogHelperService } from '../../services/dialogs/dialog-helper.service';
import { actionDislikedLocal, actionLikedLocal } from '../../actions/happens/likes.action';
import { Store } from '@ngrx/store';
import { DialogService } from '../../services/dialogs/dialog.service';

@Component({
  selector: 'app-dialog-comments',
  templateUrl: './dialog-happen-comments.component.html',
  styleUrl: './dialog-happen-comments.component.scss',
  standalone: true,
  imports: [CommonModule, SharedModule, FollowerPipe],
})
export class DialogHappenCommentsComponent {
  public get happen() {
    return this.data.data.data;
  }
  public get index() {
    return this.data.data.index;
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: dialogData<{ index: number; data: ProfileHappen }>,
    
  ) {}

  
}
