import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayStubSearchComponent } from './pay-stub-search.component';

describe('PayStubSearchComponent', () => {
  let component: PayStubSearchComponent;
  let fixture: ComponentFixture<PayStubSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayStubSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayStubSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
