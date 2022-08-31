import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinigridComponent } from './minigrid.component';

describe('MinigridComponent', () => {
  let component: MinigridComponent;
  let fixture: ComponentFixture<MinigridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinigridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinigridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
