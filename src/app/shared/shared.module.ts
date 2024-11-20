import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatSelectModule } from '@angular/material/select';
import { DeviceDetectorDirective } from '../core/directives/device-detector/device-detector.directive';

const commons = [
  MatCheckboxModule,
  MatInputModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatMenuModule,
  MatBadgeModule,
  MatDividerModule,
  MatButtonModule,
  MatCardModule,
  MatTooltipModule,
  MatTabsModule,
  MatChipsModule,
  MatDialogModule,
  MatSnackBarModule,
  MatStepperModule,
  MatRadioModule,
  MatAutocompleteModule,
  FormsModule,
  MatFormFieldModule,
  ReactiveFormsModule,
  CdkAccordionModule,
  MatSelectModule,
  AsyncPipe,
  DeviceDetectorDirective,
];
@NgModule({
  declarations: [],
  imports: [...commons],
  exports: [...commons],
})
export class SharedModule {}
