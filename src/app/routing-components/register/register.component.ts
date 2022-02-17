import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateService } from 'src/app/services/i18n/translate.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  subscriptions: Subscription[] = [];

  private readonly ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9_]*$/;

  registerForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(3), this.alphaNumericValidator(this.ALPHA_NUMERIC_REGEX)]]
  });

  emailError: boolean = false;
  usernameError: boolean = false;

  constructor(private readonly userService: UserService, private readonly router: Router, private formBuilder: FormBuilder, private translateService: TranslateService) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  alphaNumericValidator(regEx: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = !regEx.test(control.value);
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }

  isEmailValid(): boolean {
    this.emailError = !this.registerForm.get('email')?.valid!;
    console.log(this.emailError);
    return !this.emailError;
  }

  isUsernameValid(): boolean {
    this.usernameError = !this.registerForm.get('username')?.valid!;
    console.log(this.usernameError);
    return !this.usernameError;
  }
  ngOnInit(): void {
    if (this.userService.isUserLoggedIn()) {
      this.navigateToHome();
    } else {
      this.subscriptions.push(this.userService.onUserStateChanged.subscribe(state => {
        if (state) {
          this.navigateToHome();
        }
      }));
    }
  }

  navigateToHome() {
    this.router.navigate(['']);
  }

  async connect() {
    if (this.isEmailValid() && this.isUsernameValid()) {
      console.log("Register");
    }
  }

}
