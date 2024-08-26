import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDemandeCongeComponent } from './user-demande-conge.component';

describe('UserDemandeCongeComponent', () => {
  let component: UserDemandeCongeComponent;
  let fixture: ComponentFixture<UserDemandeCongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDemandeCongeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDemandeCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
