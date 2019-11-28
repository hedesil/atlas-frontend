import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../administration/companies/company.service';
import { AreaService } from '../administration/areas/area.service';
import { ProfilesService } from '../administration/profiles/profile.service';
import { UsersService } from '../administration/users/users.service';
import { AlertsService } from '../alerts.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  nCompanies : number
  nUsers : number
  nAreas : number
  nProfiles : number
  
  constructor(private alertService : AlertsService,private companyService : CompanyService, private areaService : AreaService, private profileService : ProfilesService, private userService : UsersService) { }

  ngOnInit() {
    this.getUsers()
    this.getAreas()
    this.getProfiles()
    this.getCompanies()
  }
  
  getUsers(){
    this.userService.getUsers(null,0)
    .subscribe(
      (users) =>{
        this.nUsers = users[1]
      },
      (error) => {
        this.alertService.error(error.error.message)
      }
    )
  }


  getAreas(){
    this.areaService.getAreas(null,0)
    .subscribe(
      (areas) =>{
        this.nAreas = areas[1]
      },
      (error) => {
        this.alertService.error(error.error.message)
      }
    )
  }
  getProfiles(){
    this.profileService.getProfiles(null,0)
    .subscribe(
      (profiles) =>{
        this.nProfiles = profiles[1]
      },
      (error) => {
        this.alertService.error(error.error.message)
      }
    )
  }
  getCompanies(){
    this.companyService.getCompanies(null,0)
    .subscribe(
      (companies) =>{
        this.nCompanies = companies[1]
      },
      (error) => {
        this.alertService.error(error.error.message)
      }
    )
  }

}
