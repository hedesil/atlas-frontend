import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodologyDetailComponent } from './methodology-detail.component';

describe('MethodologyDetailComponent', () => {
  let component: MethodologyDetailComponent;
  let fixture: ComponentFixture<MethodologyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MethodologyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodologyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
