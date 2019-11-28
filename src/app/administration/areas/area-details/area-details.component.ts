import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AreaService} from '../area.service';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {CompanyService} from '../../companies/company.service';
import {Area} from '../../../shared/models/area';
import { AlertsService } from 'src/app/alerts.service';



@Component({
  selector: 'app-area-details',
  templateUrl: './area-details.component.html',
  styleUrls: ['./area-details.component.scss']
})
export class AreaDetailsComponent implements OnInit {

  @Input() input: Area;
  area: Area;
  @Output() emit = new EventEmitter<Area>();
  


  constructor(private areaService: AreaService, private alertService : AlertsService) {
  }

  ngOnInit() {
    this.area = this.input;
    this.getAreaDetails(this.input);
  }



  getAreaDetails = (area: Area) => {
    this.areaService.getArea(area)
      .subscribe((area) => {
        this.area = area;
      },
      error => {
        this.alertService.error(error.error.message)
      });
  };

  modifyArea() {
    delete this.area.company
    this.areaService.modifyArea(this.area)
      .subscribe((res) => {
        this.alertService.success("Area has been modified")
        this.area = res;
        this.emit.emit(this.area)
      },
      error => {
        this.alertService.error(error.error.message)
      });
  }

}
