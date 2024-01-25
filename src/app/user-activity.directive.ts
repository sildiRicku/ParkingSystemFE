import { Directive, ElementRef, HostListener } from '@angular/core';
import { SessionService } from './session.service';
@Directive({
  selector: '[appUserActivity]'
})
export class UserActivityDirective {

  constructor(private sessionService: SessionService) { }

  @HostListener('window:mousemove', ['$event'])
  @HostListener('window:keydown', ['$event'])
  onUserActivity(event: MouseEvent | KeyboardEvent): void {
    this.sessionService.onUserActivity();
  }

}
