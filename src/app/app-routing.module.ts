import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SecondPageComponent } from './second-page/second-page.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'second', component: SecondPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
