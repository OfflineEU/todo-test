import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public router: Router,
  ) {
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      if (this.router.url !== '/') {
        $('body').css('background-color', '#4BBF6B');
        $('.navbar').css('background-color', '#3FA25B');
      } else {
        $('body').css('background-color', '#fff');
        $('.navbar').css('background-color', '#026AA7');
      }
    });
  }
}
