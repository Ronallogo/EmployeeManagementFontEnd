import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPayementComponent } from './user-payement.component';

describe('UserPayementComponent', () => {
  let component: UserPayementComponent;
  let fixture: ComponentFixture<UserPayementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPayementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPayementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
