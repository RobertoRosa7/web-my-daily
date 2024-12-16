import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';

@Directive()
export abstract class Form {
  @Input()
  public inputValue: string | undefined | null;

  @Input()
  public isHideSubmit = true;

  @Output()
  public readonly initForm = new EventEmitter<FormControl>();

  /**
   *
   * @param form FormControl
   * @returns Observable<FormControl>
   */
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

  /**
   *
   * @param form FormControl
   * @returns Observable<string>
   */
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
