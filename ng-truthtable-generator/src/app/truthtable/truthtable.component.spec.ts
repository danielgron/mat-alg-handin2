import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruthtableComponent } from './truthtable.component';

describe('TruthtableComponent', () => {
  let component: TruthtableComponent;
  let fixture: ComponentFixture<TruthtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruthtableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TruthtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
