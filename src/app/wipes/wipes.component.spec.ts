import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WipesComponent } from './wipes.component';

describe('WipesComponent', () => {
  let component: WipesComponent;
  let fixture: ComponentFixture<WipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
