import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceMenuComponent } from './absence-menu.component';

describe('AbsenceMenuComponent', () => {
  let component: AbsenceMenuComponent;
  let fixture: ComponentFixture<AbsenceMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbsenceMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsenceMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
