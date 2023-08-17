import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RulePageComponent } from './rule-page/rule-page.component';
import { FormsModule } from '@angular/forms';
import { ParkingSystemService } from './parking-system.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    RulePageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ParkingSystemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
