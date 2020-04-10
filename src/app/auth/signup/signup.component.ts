import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";

import { AuthService } from "../auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: []
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  submitted = false;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
        authStatus => {
          this.isLoading = false;
        }
    )
  }

  ngOnDestroy() {
    this.submitted = false;
    this.authStatusSub.unsubscribe();
  }

    onSignup(form: NgForm){
      this.submitted = true;
      if (form.invalid){
        return;
      }
      this.isLoading = true;
      this.authService.createUser(
          form.value.create_mail,
          form.value.create_password
      )
      this.submitted = false;
  }
}
