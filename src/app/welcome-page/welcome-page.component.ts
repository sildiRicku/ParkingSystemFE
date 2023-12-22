import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  user = {
    email: '',
    password: '',
    rememberMe: false 
  };

  emailFormatError: string = '';
  passwordError: string = '';

  constructor(private router: Router, private authService: AuthServiceService) {}

  ngOnInit() {
    const storedEmail = localStorage.getItem('rememberedEmail');
    if (storedEmail) {
      this.user.email = storedEmail;
      this.user.rememberMe = true;
    }
  }

  login() {
    this.emailFormatError = '';
    this.passwordError = '';

    if (!this.isValidEmailFormat(this.user.email)) {
      this.emailFormatError = 'Wrong email format';
      return;
    }

    this.authService.login(this.user.email, this.user.password).subscribe(
      () => {
        if (this.user.rememberMe) {
          localStorage.setItem('rememberedEmail', this.user.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        this.router.navigateByUrl('/rules');
      },
      (error: any) => {
        this.passwordError = 'Invalid email or password';
        console.log('Error response from server:', error);
      }
    );
  }

  private isValidEmailFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
