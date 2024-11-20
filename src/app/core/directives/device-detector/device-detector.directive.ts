import { Directive } from '@angular/core';
import { BaseDetectorDirective } from '../base-detector.directive';

@Directive({
  selector: '[dailyMobile]',
  standalone: true,
})
export class DeviceDetectorDirective extends BaseDetectorDirective {
  private readonly mobile = 'mobile';
  private readonly desktop = 'desktop';

  protected onDeviceChange(isMobile: boolean): void {
    if (isMobile) {
      this.renderer.addClass(this.el.nativeElement, this.mobile);
      this.renderer.removeClass(this.el.nativeElement, this.desktop);
    } else {
      this.renderer.addClass(this.el.nativeElement, this.desktop);
      this.renderer.removeClass(this.el.nativeElement, this.mobile);
    }
  }
}
