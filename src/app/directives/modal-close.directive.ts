import {Directive, HostListener, Input} from '@angular/core';
import * as $ from 'jquery';

@Directive({
  selector: '[appModalClose]'
})
export class ModalCloseDirective {
  @Input('appModal') mode: string;

  @HostListener('click') onClick() {
    $('.card-modal-wrapper').css('display', 'none');
  }
}
