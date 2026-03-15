import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDisableAfterClick]',
})
export class AppDisableAfterClick {
  constructor(
    private ele: ElementRef,
    private render2: Renderer2,
  ) {}
  @HostListener('click')
  onClick() {
    this.render2.setProperty(this.ele.nativeElement, 'disabled', true);
    this.render2.setProperty(this.ele.nativeElement, 'innerText', "Processing...");
    
    setTimeout(() => {
      this.render2.setProperty(this.ele.nativeElement, 'innerText', "Booked");
    }, 3000);
  }
}
