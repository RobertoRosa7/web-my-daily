import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';

/**
 * https://dev.to/tomwebwalker/async-material-autocomplete-in-angular-360a
 */
@Component({
  selector: 'app-input-search',
  styles: `
  ::ng-deep .mat-mdc-form-field-bottom-align {
    display: none;
  }
  `,
  template: `
    <mat-form-field appearance="fill" class="w-full">
      <mat-icon matPrefix>search</mat-icon>
      <input [formControl]="formSearch" [matAutocomplete]="auto" matInput type="text" placeholder="Pesquisar" />
      <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete">
        @for (option of filteredOptions | async; track option) {
        <mat-option [value]="option">{{ option }}</mat-option>
        }
      </mat-autocomplete>
    </mat-form-field>
  `,
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class InputSearchComponent implements OnInit {
  public readonly formSearch = new FormControl('');
  public options: string[] = ['One', 'Two', 'Three'];
  public filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.formSearch.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) => option.toLowerCase().includes(filterValue));
  }
}
