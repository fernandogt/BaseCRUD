import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridClientesComponent } from './grid-clientes.component';

describe('GridClientesComponent', () => {
  let component: GridClientesComponent;
  let fixture: ComponentFixture<GridClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
