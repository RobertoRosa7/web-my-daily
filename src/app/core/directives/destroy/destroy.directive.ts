import { Directive, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

type DestroyType = <T>(source: Observable<T>) => Observable<T>;

@Directive()
export class InDestroyDirective implements OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected takeUntilDestroy(): DestroyType {
    return (source) => source.pipe(takeUntil(this.destroy$));
  }
}
