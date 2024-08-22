import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayStubComponent } from './pay-stub.component';

describe('PayStubComponent', () => {
  let component: PayStubComponent;
  let fixture: ComponentFixture<PayStubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayStubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayStubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
