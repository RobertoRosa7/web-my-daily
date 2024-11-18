import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Subject, timer } from 'rxjs';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, SharedModule],
  template: `
    <div *ngIf="visible" class="message {{ type }}" [class.fade-out]="hide">
      {{ message }}
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
export class MessageComponent implements OnInit, OnDestroy {
  @Input() message!: string;
  @Input() type: 'success' | 'error' | 'info' = 'info';
  @Output() onHide = new EventEmitter<boolean>();

  public visible: boolean = true;
  public hide: boolean = false; // Variável para controlar o início da animação de fade-out
  private destroy$: Subject<void> = new Subject();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.hideAfterDelay();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  private hideAfterDelay(): void {
    timer(3000).subscribe(() => {
      this.hide = true; // Ativa a classe .fade-out para iniciar a animação de fade-out
      this.cdr.detectChanges();
      this.onHide.emit(true);
      timer(300).subscribe(() => {
        this.visible = false; // Remove o componente após a animação de fade-out
        this.cdr.detectChanges();
      });
    });
  }
}
