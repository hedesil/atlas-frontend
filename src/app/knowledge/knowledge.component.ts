
import {Component, OnInit, ViewChild} from '@angular/core';
import {ClrWizard, ClrDatagridSortOrder} from '@clr/angular';
import {Knowledge, Functionality} from '../shared/models/models';
import {Subject} from 'rxjs';
import {FormGroup, FormBuilder, FormArray} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {AlertsService} from '../alerts.service';
import {KnowledgeService} from './knowledge.service';
import {CompanyService} from '../administration/companies/company.service';

@Component({
  selector: 'app-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.scss']
})
export class KnowledgeComponent implements OnInit {

  
  @ViewChild('wizardlg', {read: '', static: true}) wizardLarge: ClrWizard;
  @ViewChild('wizardlg', {read: '', static: true}) wizardFilter: ClrWizard;
  lgOpen: boolean = false;
  testVisible: boolean;
  descSort = ClrDatagridSortOrder.DESC;
  filters = null;
  tests = null;
  knowledge: Knowledge[];
  newKnowledge: Knowledge = {category: '', content: '', name: ''};
  isModalVisible = false;
  expanded = new Array(9);
  switches = new Array(58);
  total: number;
  defaultAttribute;
  companiesSubject = new Subject<string>();
  searchForm: FormGroup;
  newKnowledgeVisible: boolean;
  knowledge$;
  knowledgeList;


  constructor(private fb: FormBuilder, private alertService: AlertsService, private knowledgeService: KnowledgeService) {
    this.searchForm = this.fb.group({
      tests: this.fb.array([]),
    });
  }

  resetForm() {
    this.searchForm = this.fb.group({
      filters: this.fb.array([]),
    });
  }

  closeModal() {
    this.isModalVisible = false;
    this.newKnowledge = {category: '', content: '', name: ''};
    this.resetSwitches();
    this.closeStacked();
  }

  resetSwitches() {
    for (let i = 0; i < this.switches.length; i++) {
      this.switches[i] = false;
    }
  }

  closeStacked() {
    for (let i = 0; i < this.expanded.length; i++) {
      this.expanded[i] = false;
    }
  }


  ngOnInit() {
    this.getKnowledge();
  }

  getKnowledge() {
    this.knowledgeService.getKnowledge(null, 0)
      .subscribe(
        result => {
          this.knowledgeList = result[0];
        }
      );
  }

  addKnowledge() {
    this.knowledgeService.addKnowledge(this.newKnowledge)
      .subscribe(
        (res) => {
          this.alertService.success('Knowledge has been added');
          this.getKnowledge();
        }, error => {
          this.alertService.error(error.error.message);
        }
      );

  }

  deleteKnowledge = (knowledge: Knowledge) => {
    this.knowledgeService.deleteKnowledge(knowledge)
      .subscribe(() => {
          this.alertService.success("knowledge has been deleted");
          this.getKnowledge();
        },
        error => {
          this.alertService.error(error.error.message)
        });
  };

}
