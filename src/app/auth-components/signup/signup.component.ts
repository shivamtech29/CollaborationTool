import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth-services/auth-service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackkBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    }
      , { validators: this.confirmateValidation }
    )
  }
  private confirmateValidation(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password != confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });

    } else {
      formGroup.get('confirmPassword')?.setErrors(null);

    }
  }
  signup() {
    console.log(this.signupForm?.value);
    this.authService.signup(this.signupForm?.value).subscribe((res) => {
      console.log(res);
      if (res.id != null) {
        this.snackkBar.open(
          "You're registered successfuly!", 'close',
          { duration: 5000, }
        );
        this.router.navigateByUrl('/login');
      } else {
        this.snackkBar.open(
          res.message, 'close',
          { duration: 5000, }
        );
      }
    }, (error: any) => {
      this.snackkBar.open(
        "Registration failed, Please try again later", 'close',
        { duration: 5000 }
      );
    }
    );
  }
}
