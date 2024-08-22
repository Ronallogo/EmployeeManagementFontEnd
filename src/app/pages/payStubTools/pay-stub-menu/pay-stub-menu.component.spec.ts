import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayStubMenuComponent } from './pay-stub-menu.component';

describe('PayStubMenuComponent', () => {
  let component: PayStubMenuComponent;
  let fixture: ComponentFixture<PayStubMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayStubMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayStubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
