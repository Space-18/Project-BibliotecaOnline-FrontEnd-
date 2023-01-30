import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[OnlyNumber]'
})
export class OnlyNumber {

  constructor(private el: ElementRef) { }

  @Input() OnlyNumber?: boolean;

  @HostListener('keydown', ['$event']) onKeyPress(e: KeyboardEvent) {
    return this.onlyNumbers(e)
  }

  private onlyNumbers(event: KeyboardEvent): boolean {

    const charCode = event.which ? event.which : event.keyCode;

    if (charCode > 31 && charCode != 44 && charCode != 45 && charCode != 46 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}