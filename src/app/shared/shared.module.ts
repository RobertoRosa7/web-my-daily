import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const commons = [MatCheckboxModule, MatInputModule, MatIconModule, MatProgressSpinnerModule];
@NgModule({
  declarations: [],
  imports: [...commons],
  exports: [...commons],
})
export class SharedModule {}
