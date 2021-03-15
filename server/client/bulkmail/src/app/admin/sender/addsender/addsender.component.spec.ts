import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsenderComponent } from './addsender.component';

describe('AddsenderComponent', () => {
  let component: AddsenderComponent;
  let fixture: ComponentFixture<AddsenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
