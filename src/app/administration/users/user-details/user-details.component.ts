import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { CompanyService } from '../../companies/company.service';
import { ProfilesService } from '../../profiles/profile.service';
import { AlertsService } from 'src/app/alerts.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

@Input() input : User
user : User
@Output() emit = new EventEmitter<User>()

  constructor(private userService : UsersService,private companyService : CompanyService, private profileService : ProfilesService, private alertService : AlertsService) { }

  ngOnInit() {
    this.user = this.input;
    this.getUserDetails(this.input)
  }

  getUserDetails = (user : User) => {
    this.userService.getUser(user)
    .subscribe((user)=>{
      this.user = user
    },
    error => {
      this.alertService.error(error.error.message)
    })
  }

  modifyUser(){
    this.userService.modifyUser(this.user)
      .subscribe((res) => {
        this.alertService.success("User has been modified")
        this.user = res;
        this.emit.emit(this.user)
      },
      error => {
        this.alertService.error(error.error.message)
      });
  }

}
