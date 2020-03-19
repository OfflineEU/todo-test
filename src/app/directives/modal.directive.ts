import {Directive, HostListener, Input} from '@angular/core';
import * as $ from 'jquery';

@Directive({
  selector: '[appModal]'
})
export class ModalDirective {
  @Input('appModal') mode: string;

  @HostListener('click') onClick() {
    if (this.mode === 'open') {
      $('.add-board-wrapper').css('display', 'flex');
    } else if (this.mode === 'editBoardClose') {
      $('.modal-wrapper').css('display', 'none');
    } else {
      $('.add-board-wrapper').css('display', 'none');
    }
  }
}
