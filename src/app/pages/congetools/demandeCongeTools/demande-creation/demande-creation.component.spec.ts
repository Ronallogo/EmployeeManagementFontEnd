import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeCreationComponent } from './demande-creation.component';

describe('DemandeCreationComponent', () => {
  let component: DemandeCreationComponent;
  let fixture: ComponentFixture<DemandeCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
