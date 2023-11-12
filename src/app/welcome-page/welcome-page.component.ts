// Add the necessary imports
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent {
  // Define the user object
  user = {
    email: '',
    password: ''
  };

  // Inject the Router in the constructor
  constructor(private router: Router) {}

  // Handle the login logic
  login() {
    // Replace with your hardcoded email and password
    const hardcodedEmail = 'user@example.com';
    const hardcodedPassword = 'password';

    // Check if user input matches the hardcoded values
    if (this.user.email === hardcodedEmail && this.user.password === hardcodedPassword) {
      // Redirect to the second page
      this.router.navigateByUrl('/rules');
    } else {
      console.log('Invalid email or password');
      // You might want to display an error message to the user
    }
  }
}
