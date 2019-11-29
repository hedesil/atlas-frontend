import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Asset } from '../shared/models/asset';
import { Subject } from 'rxjs';
import { Company } from '../shared/models/models';
import { ClrDatagridSortOrder } from '@clr/angular';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { CompanyService } from '../administration/companies/company.service';
import { AlertsService } from '../alerts.service';
import { AppConstants } from 'src/app/shared/constants/constants';
import { AssetService } from './asset.service';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { AreaService } from '../administration/areas/area.service';



@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssetsComponent implements OnInit {
  assets: Asset[];
  companiesSubject = new Subject<string>();
  searchForm: FormGroup;
  filterVisible: boolean;
  descSort = ClrDatagridSortOrder.DESC;
  isModalVisible: boolean;
  filters = null;
  expanded = new Array(9);
  companies: Company[];
  total: number;
  newAsset: Asset = { name: '' }
  areasSubject = new Subject<string>();
  areas$;
  defaultAttributeArea;
  defaultAttributeCompany;
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

  readonly areasList$ = this.areasSubject.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(areaName => this.areaService.getAreas(areaName, 0)
      .pipe(
        map(result => {
          return result[0];
        })
      )
    ));


  private readonly _assetTypes;
  private readonly _statusTypes;
  private readonly _enviromentTypes;
  private readonly _assetVisibilityTypes;
  private readonly _grcValues;
  private readonly _trackingSystems;







  constructor(private areaService: AreaService, private companyService: CompanyService, private fb: FormBuilder, private alertService: AlertsService, private assetService: AssetService) {
    this.searchForm = this.fb.group({
      filters: this.fb.array([]),
    });

    this._trackingSystems = AppConstants.trackingSystems;
    this._statusTypes = AppConstants.statusTypes
    this._assetTypes = AppConstants.assetTypes
    this._enviromentTypes = AppConstants.enviromentTypes
    this._assetVisibilityTypes = AppConstants.assetVisibilityTypes
    this._grcValues = AppConstants.grcValues
  }

  ngOnInit() {
    this.getAssets(null, 0)
  }

  searchCompany(companyName) {
    if (companyName !== '') {
      this.companiesSubject.next(companyName);
    }
  }

  searchArea(areaName) {
    if (areaName !== '') {
      this.areasSubject.next(areaName);
    }
  }

  closeModal() {
    this.isModalVisible = false
    this.newAsset = { name: '' }
    this.closeStacked()
  }
  closeStacked() {
    for (var i = 0; i < this.expanded.length; i++) {
      this.expanded[i] = false
    }
  }

  addAsset() {
    this.newAsset.company = this.defaultAttributeCompany
    this.newAsset.businessArea = this.defaultAttributeArea
    this.newAsset.urls = this.cleanEmptyFields(this.searchForm.controls.filters.value)
    console.log(this.newAsset)
    this.assetService.addAsset(this.newAsset)
      .subscribe(
        res => {
          this.alertService.success("Asset has been added")
          this.getAssets(null, 0);
        }, error => {
          this.alertService.error(error.error.message)
        }
      )
  }

  changeAssetValues(asset) {
    var assetToUpdate = this.assets.find(this.findAssets, [asset.id])
    Object.assign(assetToUpdate, asset)
  }

  findAssets(a) {
    return a.id == this[0]
  }


  getAssets(filters, offset) {
    this.assetService.getAssets(filters, offset)
      .subscribe(
        (assets) => {
          this.assets = assets[0];
          this.total = assets[1]
        },
        error => {
          this.alertService.error(error.error.message)
        }
      );
  }

  cleanEmptyFields(filters) {
    filters.forEach(filter => {
      Object.keys(filter).forEach(field => {
        if (filter[field].length === 0) {
          delete filter[field]
        }
      })
    });
    return filters
  }

  filter() {
    this.assetService.getAssets(this.cleanEmptyFields(this.searchForm.controls.filters.value), 0)
      .subscribe((res) => {
        this.assets = res[0];
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
      enviroment: '',
      name: '',
      port: ''
    }))
  }

  deleteAsset = (asset: Asset) => {
    this.assetService.deleteAsset(asset)
      .subscribe((asset) => {
        this.alertService.success("Asset has been deleted")
        this.getAssets(null, 0);
      },
        error => {
          this.alertService.error(error.error.message)
        });
  };

}
