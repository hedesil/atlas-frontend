import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ClarityModule} from '@clr/angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {AssetsComponent} from './assets/assets.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdministrationComponent} from './administration/administration.component';
import {CompaniesComponent} from './administration/companies/companies.component';
import {AreasComponent} from './administration/areas/areas.component';
import {GroupsComponent} from './administration/groups/groups.component';
import {ProfilesComponent} from './administration/profiles/profiles.component';
import {DepartmentsComponent} from './administration/departments/departments.component';
import {CompanyDetailsComponent} from './administration/companies/company-details/company-details.component';
import {AreaDetailsComponent} from './administration/areas/area-details/area-details.component';
import {AreaService} from './administration/areas/area.service';
import {CompanyService} from './administration/companies/company.service';
import {NgSelectModule} from '@ng-select/ng-select';
import { AlertsComponent } from './alerts/alerts.component';
import { UsersComponent } from './administration/users/users.component';
import { UserDetailsComponent } from './administration/users/user-details/user-details.component';
import { ProfileDetailsComponent } from './administration/profiles/profile-details/profile-details.component';
import { MethodologiesComponent } from './methodologies/methodologies.component';
import { VulnerabilitiesComponent } from './vulnerabilities/vulnerabilities.component';
import { VulnerabilityDetailsComponent } from './vulnerabilities/vulnerability-details/vulnerability-details.component';
import { AuditsComponent } from './audits/audits.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ChartsModule } from 'ng2-charts';
import { KnowledgeComponent } from './knowledge/knowledge.component';
import { SisifoComponent } from './sisifo/sisifo.component';
import { TestsComponent } from './tests/tests.component';
import { CredentialsComponent } from './administration/credentials/credentials.component';
import { BarGraficComponent } from './bar-grafic/bar-grafic.component';
import { MethodologyDetailComponent } from './methodologies/methodology-detail/methodology-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AssetsComponent,
    DashboardComponent,
    AdministrationComponent,
    CompaniesComponent,
    AreasComponent,
    GroupsComponent,
    ProfilesComponent,
    DepartmentsComponent,
    CompanyDetailsComponent,
    AreaDetailsComponent,
    AlertsComponent,
    UsersComponent,
    UserDetailsComponent,
    ProfileDetailsComponent,
    MethodologiesComponent,
    ProfileDetailsComponent,
    PieChartComponent,
    MethodologiesComponent,
    VulnerabilitiesComponent,
    VulnerabilityDetailsComponent,
    AuditsComponent,
    TestsComponent,
    CredentialsComponent,
    KnowledgeComponent,
    SisifoComponent,
    AuditsComponent,
    BarGraficComponent,
    MethodologyDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [CompanyService, AreaService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
