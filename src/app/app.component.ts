import {Component, OnInit} from '@angular/core';

import {AuthService} from "./auth/auth.service";
import {fadeAnimation} from "./_animations/fadeInAnimation";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
  animations: [ fadeAnimation ]
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
