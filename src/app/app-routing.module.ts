import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/components /login/login.component';
import { DashboardComponent } from 'src/app/components /dashboard/dashboard.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AdminComponent } from 'src/app/components /admin/admin.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
