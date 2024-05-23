import { PLATFORM_ID, inject } from '@angular/core';
import { LocalStorageService } from '../../services/localstorages/localstorage.service';
import { ActivatedRouteSnapshot, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../../../pages/profile/core/interfaces/profile.interface';
import { actionUser } from '../../../pages/profile/core/actions/user.action';
import { JsonMapProperties } from '../../decorators/jsons/json.decorator';
import { isPlatformBrowser } from '@angular/common';

export const resolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<User | null> => {
  const platform = inject(PLATFORM_ID);
  const store = inject(Store);

  let user: User | null = null;

  if (isPlatformBrowser(platform)) {
    const services = inject(LocalStorageService);
    user = services.getKey('user');
    store.dispatch(actionUser(JsonMapProperties.deserialize(User, user)));
  }

  return of(user);
};
