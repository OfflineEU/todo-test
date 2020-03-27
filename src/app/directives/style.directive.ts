import {Directive, ElementRef, HostBinding, HostListener, Input, OnChanges, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Directive({
  selector: '[appStyle]'
})
export class StyleDirective implements OnInit, OnDestroy{

  sub$: Subscription;

  constructor(public router: Router,
              public r: Renderer2,
              public el: ElementRef
  ) {
  }

  ngOnInit() {
    this.sub$ = this.router.events.subscribe(() => {
      if (this.router.url === '/') {
        this.r.setStyle(document.body, 'background-color', '#fff');
        this.r.setStyle(this.el.nativeElement, 'background-color', '#026AA7');
      } else {
        this.r.setStyle(document.body, 'background-color', '#4BBF6B');
        this.r.setStyle(this.el.nativeElement, 'background-color', '#3FA25B');
      }
    });
  }
  ngOnDestroy() {
    this.sub$.unsubscribe();
  }
}
