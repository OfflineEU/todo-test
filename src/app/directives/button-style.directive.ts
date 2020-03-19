import {Directive, HostListener, Input} from '@angular/core';
import * as $ from 'jquery';
@Directive({
  selector: '[appButtonStyle]'
})
export class ButtonStyleDirective {
@Input('appButtonStyle') id: number;
  constructor() { }
  @HostListener('mouseenter') onEnter() {
    const selector = `[href="/boards/${this.id}"]`;
    $(`a${selector}`).parent().find($('.settBtn')).css('display', 'block');
  }
  @HostListener('mouseleave') onLeave() {
    const selector = `[href="/boards/${this.id}"]`;
    $(`a${selector}`).parent().find($('.settBtn')).css('display', 'none');
  }
}
