import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { Socket, io } from 'socket.io-client';
import { actionProfileRequest } from '../../core/actions/profile/profile.action';
import { happenRequest } from '../../core/actions/happen/profile.happens.action';
import { selGetId, selGetNameId } from '../../core/selectors/user/user.selector';
import { selectorTheme } from '../../core/selectors/colors/color.selector';
import { Observable, Observer, filter, map, mergeMap, tap } from 'rxjs';
import { ListeningFollowResponse } from '../../core/interfaces/follows/follow.interface';
import { actionSocketUserMetrics } from '../../core/actions/socket/socketio.action';
import { acUsFollowers } from '../../core/actions/user/user.action';
import { JsonMapProperties } from '../../core/decorators/jsons/json.decorator';
import { actionColor } from '../../core/actions/color/color.action';
import { backgroundType } from '../../core/types/colors/color.type';
import { InDestroyDirective } from '../../core/directives/destroy/destroy.directive';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FieldNameEnul } from '../../core/enums/bases/base.enum';

@Component({
  selector: 'app-profile',
  template: `
    <app-toolbar [id]="userId$ | async"></app-toolbar>
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile extends InDestroyDirective implements OnInit {
  protected readonly platform = inject(PLATFORM_ID);
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly store: Store = inject(Store);
  protected socketio!: Socket;

  public readonly fieldNames = FieldNameEnul;
  public form!: FormGroup;
  public readonly theme$ = this.store.select(selectorTheme);
  public readonly userId$: Observable<string | undefined> = this.store.select(selGetId);
  public readonly nameId$: Observable<string | undefined> = this.store.select(selGetNameId);

  public ngOnInit(): void {}

  public onFireEvent(field: string, form: FormControl) {
    this.form.addControl(field, form);
  }

  /**
   * INFO:
   * getNameId = get name field from form
   */
  public get getNameId() {
    return this.form.get(FieldNameEnul.nameId)?.value;
  }

  /**
   * INFO:
   * isNameIdValid = get name field from form is valid to submit
   */
  public get isNameIdValid() {
    return this.form.get(this.fieldNames.nameId)?.valid;
  }
}
