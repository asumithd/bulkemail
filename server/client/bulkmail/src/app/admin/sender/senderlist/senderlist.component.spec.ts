import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderlistComponent } from './senderlist.component';

describe('SenderlistComponent', () => {
  let component: SenderlistComponent;
  let fixture: ComponentFixture<SenderlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenderlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SenderlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
