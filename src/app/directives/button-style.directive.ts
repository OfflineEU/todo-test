import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appButtonStyle]'
})

export class ButtonStyleDirective {

  @Input('appButtonStyle') id: number;


  @HostListener('mouseenter', ['$event']) onEnter(event) {
    const linkParent = event.target.parentNode.querySelector(`a[href="/boards/${this.id}"]`).parentNode;
    linkParent.querySelector('.settBtn').style.display = 'block';
  }

  @HostListener('mouseleave', ['$event']) onLeave(event) {
    const linkParent = event.target.parentNode.querySelector(`a[href="/boards/${this.id}"]`).parentNode;
    linkParent.querySelector('.settBtn').style.display = 'none';
  }
}
