import { Injectable } from '@angular/core';
import { environment } from 'src/environments/development-environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionConfigService {

  constructor() { }

  getSessionTimeout(): number {
    return environment.sessionTimeout as number;
  }
}
