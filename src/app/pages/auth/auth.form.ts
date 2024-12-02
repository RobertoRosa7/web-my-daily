import { Directive, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';

@Directive()
export abstract class Form {
  @Input()
  public inputValue: string | undefined | null;

  @Input()
  public isHideSubmit: boolean = true;

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

  public onValueChanges(form: FormControl): Observable<string> {
    return form.valueChanges.pipe(
      // layer - esperar por 100 milisegundos
      debounceTime(500),
      // layer - até o usuário parar de digirar no campo
      distinctUntilChanged(),
      // layer - retornar form control
      map(() => form.value)
    );
  }
}
