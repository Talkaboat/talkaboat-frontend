import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  isRegisterVideoOpen = false;

  private readonly ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9_]*$/;

  registerForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(3), this.alphaNumericValidator(this.ALPHA_NUMERIC_REGEX)]],
    emailOptInt: [false, Validators.required]
  });

  emailError: boolean = false;
  usernameError: boolean = false;

  constructor(private readonly userService: UserService, private readonly router: Router, private formBuilder: FormBuilder, private translateService: TranslateService) { }

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
    return !this.emailError;
  }

  isUsernameValid(): boolean {
    this.usernameError = !this.registerForm.get('username')?.valid!;
    return !this.usernameError;
  }

  navigateToHome() {
    this.router.navigate(['']);
  }

  async connect() {
    if (this.isEmailValid() && this.isUsernameValid()) {
      var ref = "";
      if (localStorage.getItem('tab_ref')) {
        ref = localStorage.getItem('tab_ref')!;
      }
      this.userService.register(
        this.registerForm.get('email')?.value,
        this.registerForm.get('username')?.value,
      this.registerForm.get('emailOptInt')?.value as boolean ? false : true,
        ref
      );
    }
  }

}
