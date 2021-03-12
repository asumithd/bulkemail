import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkmailerComponent } from './bulkmailer.component';

describe('BulkmailerComponent', () => {
  let component: BulkmailerComponent;
  let fixture: ComponentFixture<BulkmailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkmailerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkmailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
