import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appColory]'
})
export class ColoryDirective {

  @HostBinding("style.backgroundColor") BGColor?: string;
  @HostBinding("style.color") color?: string;

  @HostListener("click", ["$event"]) reRender() {
    this.BGColor = "rgba(0, 180, 0, 0.2)"
    this.color = "white"
  }

  constructor() {
  }
}

// voch mi tex chi kirarvum, stexcvaca usumnakan npataknerov