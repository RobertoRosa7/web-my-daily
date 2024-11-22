import { FormControl } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';

export abstract class Form {
  public onChange(form: FormControl): Observable<FormControl> {
    return form.valueChanges.pipe(
      // layer - esperar por 100 milisegundos
      debounceTime(500),
      // layer - até o usuário parar de digirar no campo
      distinctUntilChanged(),
      // layer - retornar form control
      map(() => form)
    );
  }
}
