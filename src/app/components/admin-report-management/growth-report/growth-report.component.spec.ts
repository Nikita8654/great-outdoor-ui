import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthReportComponent } from './growth-report.component';

describe('GrowthReportComponent', () => {
  let component: GrowthReportComponent;
  let fixture: ComponentFixture<GrowthReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowthReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowthReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
