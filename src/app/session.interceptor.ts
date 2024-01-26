import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { SessionService } from './session.service';
import { Observable } from 'rxjs';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.sessionService.resetSession();
    this.sessionService.resetTimeout();
    return next.handle(request);
  }
}
