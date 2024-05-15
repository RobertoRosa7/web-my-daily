import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-input-photo',
  templateUrl: './input-photo.component.html',
  styleUrl: './input-photo.component.scss',
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class InputPhotoComponent {}
