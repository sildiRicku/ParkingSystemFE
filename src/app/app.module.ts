import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RulePageComponent } from './rule-page/rule-page.component';
import { ParkingSystemService } from './parking-system.service';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { SessionTimeoutModalComponent } from './session-timeout-modal/session-timeout-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SessionService } from './session.service';
import { AuthServiceService } from './auth.service';
import { UserActivityDirective } from './user-activity.directive';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    RulePageComponent,  
    NotFoundComponent,
    SessionTimeoutModalComponent,
    UserActivityDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule
],
  providers: [ParkingSystemService, SessionService, AuthServiceService,BsModalService],
  bootstrap: [AppComponent],

})
export class AppModule { }
