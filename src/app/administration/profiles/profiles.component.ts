import { Component, OnInit, ViewChild } from '@angular/core';
import { ClrWizard, ClrDatagridSortOrder } from '@clr/angular';
import { Profile, Functionality } from '../../shared/models/models';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AlertsService } from '../../alerts.service';
import { ProfilesService } from './profile.service';


interface NewProfile{
  name : string,
  functionalities : Functionality[]
}

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  @ViewChild("wizardlg",{read :"",static: true}) wizardLarge: ClrWizard;
  @ViewChild("wizardlg",{read :"",static: true}) wizardFilter: ClrWizard;
  lgOpen: boolean = false;
  descSort = ClrDatagridSortOrder.DESC;
  filters = null;
  profiles: Profile[];
  newProfile : Profile = { name : '', functionalities : [] };
  isModalVisible = false
  expanded = new Array(11);

  switches = new Array(66)
  total: number;
  defaultAttribute;
  companiesSubject = new Subject<string>();
  searchForm: FormGroup;
  filterVisible: boolean;



 


  constructor(private fb : FormBuilder,private alertService : AlertsService, private profileService : ProfilesService) {
    this.searchForm = this.fb.group({
      filters: this.fb.array([]),
    });
  }


  resetForm(){
    this.searchForm = this.fb.group({
      filters: this.fb.array([]),
    });
  }


  closeModal(){
    this.isModalVisible = false
    this.newProfile = { name : '', functionalities : []}
    this.resetSwitches()
    this.closeStacked()
  }
  
  resetSwitches(){
    for(var i = 0;i< this.switches.length;i++){
      this.switches[i]=false
    }
  }
closeStacked(){
  for(var i = 0;i< this.expanded.length;i++){
    this.expanded[i]=false
  }
}

  toggle2(e,functionalityName){
    if(e.target.checked){
      this.addFunctionality2(functionalityName)
    }else{
      this.removeFunctionality2(functionalityName)
    }
  }
  
  addFunctionality2(functionalityName){
    this.newProfile.functionalities.push({ name : functionalityName})
  }
  
  removeFunctionality2(functionalityName){
    var filtered = this.newProfile.functionalities.filter(function(value,index,arr){
      return value.name != functionalityName
    })
    this.newProfile.functionalities=filtered
  }
  

  ngOnInit() {
    this.getProfiles(null,0);

  }

  addProfile() {
    this.profileService.addProfile(this.newProfile)
      .subscribe((res) => {
        this.alertService.success("Profile has been added")
        this.getProfiles(null,0);
      },error => {
        this.alertService.error(error.error.message)
      }
      );
  }


  changeProfileValues(profile) {
    var profileToUpdate = this.profiles.find(this.findProfiles, [profile.id])
    Object.assign(profileToUpdate, profile)
  }

  findProfiles(a) {
    return a.id == this[0]
  }

  getProfiles(filters,offset) {
    this.profileService.getProfiles(filters,offset)
      .subscribe((profiles) => {
        this.profiles = profiles[0];
        this.total = profiles[1];
      },
      error => {
        this.alertService.error(error.error.message)
      });
  }

  cleanEmptyFields(filters) {
    console.log(filters)
    filters.forEach(filter => {
      Object.keys(filter).forEach(field => {
        if (!filter[field]) {
          delete filter[field]
        }
      })
    });
    return filters
  }

  filter() {
    this.profileService.getProfiles(this.cleanEmptyFields(this.searchForm.controls.filters.value), 0)
      .subscribe((res) => {
        this.profiles = res[0];
        this.total = res[1];
        this.filters = this.searchForm.controls.filters.value
      },
        error => {
          this.alertService.error(error.error.message)
        }
      );
  }

  addFilters() {
    var filters = this.searchForm.controls.filters as FormArray
    filters.push(this.fb.group({
      name: '',
      company : '',
    }))
  }

  deleteProfile = (profile: Profile) => {
    this.profileService.deleteProfile(profile)
      .subscribe((profile) => {
        this.alertService.success("Profile has been deleted")
        this.getProfiles(null,0);
      },
      error => {
        console.log(error)
        this.alertService.error(error.error.message)
      });
  };

}
