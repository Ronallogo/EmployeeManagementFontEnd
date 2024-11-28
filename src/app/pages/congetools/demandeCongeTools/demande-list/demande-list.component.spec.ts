import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeListComponent } from './demande-list.component';

describe('DemandeListComponent', () => {
  let component: DemandeListComponent;
  let fixture: ComponentFixture<DemandeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
