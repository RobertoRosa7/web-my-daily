import { FormControl } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, map, of } from 'rxjs';

export abstract class Form {
  public onChange(form: FormControl): Observable<FormControl> {
    return form.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map(() => form)
    );
  }
}
