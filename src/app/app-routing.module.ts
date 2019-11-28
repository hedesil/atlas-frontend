import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AssetsComponent} from './assets/assets.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AdministrationComponent} from './administration/administration.component';
import {CompaniesComponent} from './administration/companies/companies.component';
import {AreasComponent} from './administration/areas/areas.component';
import {DepartmentsComponent} from './administration/departments/departments.component';
import {GroupsComponent} from './administration/groups/groups.component';
import {ProfilesComponent} from './administration/profiles/profiles.component';
import { UsersComponent } from './administration/users/users.component';
import {MethodologiesComponent} from './methodologies/methodologies.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'assets', component: AssetsComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'administration', component: AdministrationComponent,
    children: [
      {path: '', redirectTo: 'companies', pathMatch: "full"},
      {path: 'companies', component: CompaniesComponent},
      {path: 'areas', component: AreasComponent},
      {path: 'users', component: UsersComponent},
      {path: 'departments', component: DepartmentsComponent},
      {path: 'groups', component: GroupsComponent},
      {path: 'profiles', component: ProfilesComponent}
    ]
  },
  {path: 'methodologies', component: MethodologiesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
