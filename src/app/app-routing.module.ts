import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RulePageComponent } from './rule-page/rule-page.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'rules', component: RulePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
