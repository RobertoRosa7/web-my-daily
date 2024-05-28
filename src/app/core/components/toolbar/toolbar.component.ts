import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ButtonMenuComponent } from '../button-menu/button-menu.component';
import { ButtonBackComponent } from '../button-back/button-back.component';
import { selectorTheme } from '../../selectors/colors/color.selector';
import { InputSearchComponent } from '../input-search/input-search.component';
import { selectName } from '../../../pages/profile/core/selectors/user.selector';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [SharedModule, CommonModule, ButtonMenuComponent, ButtonBackComponent, InputSearchComponent, RouterModule],
})
export class ToolbarComponent implements OnInit {
  private readonly router: Router = inject(Router);
  private readonly store: Store = inject(Store);
  protected readonly dialog?: MatDialog = inject(MatDialog);

  public theme$ = this.store.select(selectorTheme);
  public name$ = this.store.select(selectName);

  @Output() send = new EventEmitter();
  @Output() updateRegisters = new EventEmitter();

  @Input()
  public id!: string | null | undefined;

  public autocomplete$!: Observable<string[]>;
  public notifications$!: Observable<any[]>;

  public searchTerms: FormControl = new FormControl();
  public user: any;
  public isDark!: boolean;

  ngOnInit(): void {
    // this.store
    //   .select(({ profile, dashboard }: any) => ({
    //     profile: profile.user,
    //     theme: dashboard.dark_mode,
    //   }))
    //   .subscribe(async (state) => {
    //     this.isDark = !(state.theme === 'dark-mode');
    //     this.user = state.profile;
    //   });
    // this.notifications$ = this.store
    //   .select(({ dashboard }: any) => ({ notification: dashboard.notification_list }))
    //   .pipe(map((states) => states.notification));
  }

  public onSubmit(): void {
    this.router?.navigate(['dashboard/result-search', { s: this.searchTerms.value }]);
    this.searchTerms.reset();
  }

  public setSearch(event: MatAutocompleteSelectedEvent): void {
    this.router.navigate(['dashboard/result-search', { s: event.option.value }]);
    this.searchTerms.reset();
  }

  public hideMenu(): void {
    this.send.emit('hide');
  }

  public logout(): void {
    this.router.navigateByUrl('/');
  }

  public add(type: string): void {
    // this.dialog
    //   ?.open(DialogFormIncomingComponent, { data: { type }, panelClass: 'dialog-default' })
    //   .afterClosed()
    //   .subscribe((res) => {
    //   });
  }

  public updateAllRegisters(event: Event): void {
    event.stopPropagation();
    this.updateRegisters.emit('update');
  }

  public formatarValor(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(valor);
  }
}
