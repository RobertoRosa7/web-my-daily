import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

const commons = [MatCheckboxModule, MatInputModule, MatIconModule];
@NgModule({
  declarations: [],
  imports: [...commons],
  exports: [...commons],
})
export class SharedModule {}
