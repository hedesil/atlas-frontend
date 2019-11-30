import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SisifoComponent } from './sisifo.component';

describe('SisifoComponent', () => {
  let component: SisifoComponent;
  let fixture: ComponentFixture<SisifoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SisifoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SisifoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
