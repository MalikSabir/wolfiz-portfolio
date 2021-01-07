import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbaordMainComponent } from './dashbaord-main.component';

describe('DashbaordMainComponent', () => {
  let component: DashbaordMainComponent;
  let fixture: ComponentFixture<DashbaordMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashbaordMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbaordMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
