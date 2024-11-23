import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { mergeMap, timer } from 'rxjs';
import { InDestroyDirective } from '../../directives/destroy/destroy.directive';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, SharedModule],
  template: `
    <div *ngIf="visible" class="message {{ type }}" [class.fade-out]="hide">
      <mat-error *ngIf="type === 'error' && message">
        {{ message }}
      </mat-error>

      <mat-hint *ngIf="type !== 'error' && message">
        {{ message }}
      </mat-hint>
    </div>
  `,
  styles: [
    `
      .message {
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 5px;
        transition: opacity 0.5s ease-out; /* Adicionando uma transição suave de 0.5 segundos */
      }

      .success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
      }

      .error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
      }
      .info {
        background-color: var(--border-default);
        color: var(--dark);
        border: 1px solid var(--dark);
      }
      .fade-out {
        opacity: 0; /* Define a opacidade para 0 ao ativar a classe .fade-out */
      }
    `,
  ],
})
export class MessageComponent extends InDestroyDirective implements OnInit {
  @Input({ required: true })
  public message: string | undefined = undefined;

  @Input()
  public type: 'success' | 'error' | 'info' = 'info';

  @Output()
  public onHide = new EventEmitter<boolean>();

  @Input()
  public visible: boolean = false;
  public hide: boolean = false; // Variável para controlar o início da animação de fade-out

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    timer(3000)
      .pipe(
        // layer - destroy component
        this.takeUntilDestroy(),
        // layer - wait 300
        mergeMap(() => {
          this.hide = true; // Ativa a classe .fade-out para iniciar a animação de fade-out
          this.cdr.detectChanges();
          this.onHide.emit(true);
          return timer(500);
        })
      )
      .subscribe(() => {
        this.visible = false; // Remove o componente após a animação de fade-out
        this.cdr.detectChanges();
      });
  }
}
