import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    },
    );
  }
  get registerFormControl() {
    return this.signinForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.signinForm.valid) {
      this.authService.logIn(this.signinForm.value.email, this.signinForm.value.password);
    }
  }

}
