import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuaterlyComponent } from './quaterly.component';

describe('QuaterlyComponent', () => {
  let component: QuaterlyComponent;
  let fixture: ComponentFixture<QuaterlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuaterlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuaterlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
