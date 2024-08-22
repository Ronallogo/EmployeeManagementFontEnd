import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceSearchComponent } from './absence-search.component';

describe('AbsenceSearchComponent', () => {
  let component: AbsenceSearchComponent;
  let fixture: ComponentFixture<AbsenceSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbsenceSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsenceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
