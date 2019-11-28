import {Component, OnInit, ViewChild} from '@angular/core';
import {AreaService} from './area.service';
import {Area} from '../../shared/models/area';
import { ClrDatagridSortOrder, ClrWizard } from '@clr/angular';
import { Subject, Observable, concat, of } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { AlertsService } from 'src/app/alerts.service';
import { debounceTime, distinctUntilChanged, switchMap, map, tap, catchError } from 'rxjs/operators';
import { CompanyService } from '../companies/company.service';
import { Company } from 'src/app/shared/models/models';


interface NewArea {
  name: string,
  companyId: number
}

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {
  @ViewChild("wizardlg",{read :"",static: true}) wizardLarge: ClrWizard;
  @ViewChild("wizardlg",{read :"",static: true}) wizardFilter: ClrWizard;
  lgOpen: boolean = false;
  descSort = ClrDatagridSortOrder.DESC;
  filters = null;
  companies: Company[];
  areas: Area[];

  total: number;
  defaultAttribute;
  companiesSubject = new Subject<string>();
  searchForm: FormGroup;
  filterVisible: boolean;
  companies$;

  readonly companiesList$ = this.companiesSubject.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(companyName => this.companyService.getCompanies(companyName, 0)
      .pipe(
        map(result => {
          return result[0];
        })
      )
    ));


 
    searchCompany(companyName) {
      if (companyName !== '') {
        this.companiesSubject.next(companyName);
      }
    }
  

  constructor(private companyService : CompanyService,private areaService: AreaService,private fb : FormBuilder,private alertService : AlertsService) {
    this.searchForm = this.fb.group({
      filters: this.fb.array([]),
    });
  }


  resetForm(){
    this.searchForm = this.fb.group({
      filters: this.fb.array([]),
    });
  }

  
  

  ngOnInit() {
    this.companies$ = this.companyService.getCompanies(null, 0).pipe(
      map(companies => {
        this.companies = companies[0];
        this.defaultAttribute = this.companies[0];
        console.log(this.defaultAttribute);
        this.total = companies[1];
        return companies;
      })
    );

    this.getAreas(null,0);
  }

  addArea({value}: { value: NewArea }) {
    this.areaService.addArea(value)
      .subscribe((res) => {
        this.alertService.success("Area has been added")
        this.getAreas(null,0);
      },error => {
        this.alertService.error(error.error.message)
      }
      );
  }


  changeAreaValues(area) {
    var areaToUpdate = this.areas.find(this.findAreas, [area.id])
    Object.assign(areaToUpdate, area)
  }

  findAreas(a) {
    return a.id == this[0]
  }

  getAreas(filters,offset) {
    console.log(filters)
    this.areaService.getAreas(filters,offset)
      .subscribe((areas) => {
        this.areas = areas[0];
        this.total = areas[1];
      },
      error => {
        this.alertService.error(error.error.message)
      });
  }

  cleanEmptyFields(filters) {
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
    this.areaService.getAreas(this.cleanEmptyFields(this.searchForm.controls.filters.value), 0)
      .subscribe((res) => {
        console.log(res)
        this.areas = res[0];
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

  deleteArea = (area: Area) => {
    this.areaService.deleteArea(area)
      .subscribe((area) => {
        this.alertService.success("Area has been deleted")
        this.getAreas(null,0);
      },
      error => {
        console.log(error)
        this.alertService.error(error.error.message)
      });
  };


}
