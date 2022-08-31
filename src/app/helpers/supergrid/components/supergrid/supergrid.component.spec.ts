import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupergridComponent } from './supergrid.component';

describe('SupergridComponent', () => {
  let component: SupergridComponent;
  let fixture: ComponentFixture<SupergridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupergridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupergridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
