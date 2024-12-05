import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { Socket, io } from 'socket.io-client';
import { acReqProfile } from '../../core/actions/profile/profile.action';
import { happenRequest } from '../../core/actions/happen/profile.happens.action';
import { selGetId, selGetNameId, selGetNickname } from '@selectors/user/user.selector';
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
import { FieldNameEnum } from '../../core/enums/bases/base.enum';
import { ShowMessage } from '@interfaces/message/message.interface';
import { acShowMessage } from '@actions/message/message.action';

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

  public form!: FormGroup;
  public isReady!: boolean;

  public readonly fieldNames = FieldNameEnum;
  public readonly theme$ = this.store.select(selectorTheme);
  public readonly userId$: Observable<string | undefined> = this.store.select(selGetId);
  public readonly nameId$: Observable<string | undefined> = this.store.select(selGetNameId);
  public readonly nickname$: Observable<string | undefined> = this.store.select(selGetNickname);

  public ngOnInit(): void {}

  public onFireEvent(field: string, form: FormControl) {
    this.form.addControl(field, form);
    this.isReady = true;
  }

  protected clearMessage() {
    // clear message
    this.store.dispatch(
      acShowMessage({
        body: {
          type: '',
          show: false,
          message: '',
        },
      })
    );
  }

  /**
   * Dispatch action to update display message
   *
   * @param message string
   * @param type string
   */
  protected showMessage(message: string, type: string): void {
    this.store.dispatch(
      acShowMessage({
        body: this.buildShowMessage(message, type),
      })
    );
  }

  /**
   * Constructs an error message for display.
   * @param message The error message.
   */
  protected buildShowMessage(message: string, type: string): ShowMessage {
    const body = new ShowMessage();

    body.message = message;
    body.type = type;
    body.show = true;

    return body;
  }
}
