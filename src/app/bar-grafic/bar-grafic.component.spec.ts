import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarGraficComponent } from './bar-grafic.component';

describe('BarGraficComponent', () => {
  let component: BarGraficComponent;
  let fixture: ComponentFixture<BarGraficComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarGraficComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarGraficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
