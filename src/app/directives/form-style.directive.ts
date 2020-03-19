import {Directive, HostListener, Input} from '@angular/core';
import * as $ from 'jquery';

@Directive({
  selector: '[appFormStyle]'
})
export class FormStyleDirective {

  @HostListener('click', ['$event']) onClick(event) {
    $('.addCardTitleForm').css('display', 'none');
    $('.addCardTitle').css('display', 'block');
    const target = event.target;
    if (target.parentNode.id === 'newColumn') {
      $('#create-column').css('display', 'block');
      $('.column-add').find('h3').css('display', 'none');
    } else if (target.id === 'closeNewColumn') {
      $('#create-column').css('display', 'none');
      $('.column-add').find('h3').css('display', 'block');
    } else if (target.id === 'newCard') {
      const form = $(target).parent().find('form');
      const title = $(target).parent().find('a');
      title.css('display', 'none');
      form.css('display', 'block');
    } else if (target.id === 'closeNewCard') {
      const form = $(target).parent().parent();
      const title = form.parent().find('a');
      title.css('display', 'block');
      form.css('display', 'none');
    }
  }
}
