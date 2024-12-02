import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, HostListener, inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';

@Directive()
export abstract class BaseDetectorDirective implements OnInit {
  protected readonly platform = inject(PLATFORM_ID);

  constructor(protected el: ElementRef, protected renderer: Renderer2) {}

  public ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.onDeviceChange(this.isMobile());
    }
  }

  @HostListener('window:resize')
  public onRize() {
    this.onDeviceChange(this.isMobile()); // Atualiza o estado ao redimensionar
  }

  private isMobile(): boolean {
    return window.innerWidth <= 768; // Define o limite para dispositivos móveis
  }

  /**
   * Método abstrato para ser implementado pelas diretivas filhas
   * @param isMobile Indica se o dispositivo é mobile
   */
  protected abstract onDeviceChange(isMobile: boolean): void;
}
