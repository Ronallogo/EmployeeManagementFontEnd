import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceCreationComponent } from './absence-creation.component';

describe('AbsenceCreationComponent', () => {
  let component: AbsenceCreationComponent;
  let fixture: ComponentFixture<AbsenceCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbsenceCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsenceCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
