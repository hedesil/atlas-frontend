import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { ProfilesService } from '../profile.service';
import { Profile, Functionality } from '../../../shared/models/models';
import { filter } from 'minimatch';
import { AlertsService } from '../../../alerts.service';




@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

  @Input() input: Profile
  donotDelete : boolean = true
  profile: Profile
  functionalities : Functionality[] = []
  expanded = new Array(12);

  switches = new Array(65)

 

  constructor(private profileService: ProfilesService,private alertService : AlertsService) { }

  ngOnInit() {
    this.profile = this.input
    this.profileService.getProfile(this.profile)
      .subscribe((profile) => {
        this.profile = profile;
        this.functionalities = profile.functionalities
      })
  }


  findFunctionality(f) {
    return f.name == this[0]
  }

  getProfileDetails = (profile : Profile) => {
    this.profileService.getProfile(profile)
      .subscribe((profile) => {
        this.profile = profile;
      })
  }

  closeModal(){
    this.closeStacked()
  }

  closeStacked(){
    for(var i = 0;i< this.expanded.length;i++){
      this.expanded[i]=false
    }
  }

hasFunctionality(functionalityName){
  var f = this.functionalities.find(this.findFunctionality,[functionalityName])
  return(f)
}

toggle(e,functionalityName){
  if(e.target.checked){
    this.addFunctionality(functionalityName)
  }else{
    this.removeFunctionality(functionalityName)
  }
}

addFunctionality(functionalityName){
  this.profile.functionalities.push({ name : functionalityName})
}

removeFunctionality(functionalityName){
  var filtered = this.profile.functionalities.filter(function(value,index,arr){
    return value.name != functionalityName
  })
  this.profile.functionalities=filtered
  this.functionalities=filtered
}


modifyProfile(){
  this.profileService.modifyProfile(this.profile)
    .subscribe((res) => {
      this.profile = res;
      this.alertService.success("Profile has been updated")
    })
}

}
