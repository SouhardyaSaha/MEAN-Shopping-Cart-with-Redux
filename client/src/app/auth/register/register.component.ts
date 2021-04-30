import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormBuilder,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { popupNotification } from 'src/app/shared/utils.class';
import { AuthService } from '../auth.service';
import { RegistrationBody } from '../user.model';

class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl,
    form: FormGroupDirective | NgForm
  ): boolean {
    return form.hasError('misMatch');
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  authenticationForm: FormGroup;
  isLoading: boolean = false;
  errorMatcher = new CrossFieldErrorMatcher();
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formInit();
  }

  private formInit() {
    this.authenticationForm = this.formBuilder.group(
      {
        name: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required]),
        confirm_password: new FormControl(null, [Validators.required]),
      },
      { validator: this.PasswordValidator }
    );
  }

  PasswordValidator(control: AbstractControl) {
    const password = control.get('password');
    const confirm_password = control.get('confirm_password');

    if (password.pristine || confirm_password.pristine) {
      return null;
    }

    return password &&
      confirm_password &&
      password.value !== confirm_password.value
      ? { misMatch: true }
      : null;
  }

  onSubmit() {
    if (this.authenticationForm.invalid) {
      return;
    }
    let registrationBody: RegistrationBody = this.authenticationForm.value;

    this.isLoading = true;
    this.authService.signUp(registrationBody).subscribe(
      (res) => {
        console.log(res);
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );

    this.authenticationForm.reset();
  }

  onClose() {
    // this.error = null
  }
}
