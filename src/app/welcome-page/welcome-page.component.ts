import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent {
  user = {
    email: '',
    password: ''
  };

  emailFormatError: string = '';
  passwordError: string = '';

  constructor(private router: Router) {}

  login() {
    const hardcodedEmail = 'user@example.com';
    const hardcodedPassword = 'password';

    this.emailFormatError = '';
    this.passwordError = '';

    if (!this.isValidEmailFormat(this.user.email)) {
      this.emailFormatError = 'Wrong email format';
      return;
    }

    if (this.user.email === hardcodedEmail && this.user.password === hardcodedPassword) {
      this.router.navigateByUrl('/rules');
    } else {
      this.passwordError = 'Invalid email or password';
      console.log('Invalid email or password');
    }
  }

  private isValidEmailFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
