import { Component } from '@angular/core';
import { environment } from '../environments/production-environment/environment.production';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  template: '<p>API URL: {{ apiUrl }}</p>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'parking-system';
  apiUrl = environment.apiUrl;
}
