import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RulePageComponent } from './rule-page/rule-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'rules', component: RulePageComponent,canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
