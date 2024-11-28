import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayStubUpdateComponent } from './pay-stub-update.component';

describe('PayStubUpdateComponent', () => {
  let component: PayStubUpdateComponent;
  let fixture: ComponentFixture<PayStubUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayStubUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayStubUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
