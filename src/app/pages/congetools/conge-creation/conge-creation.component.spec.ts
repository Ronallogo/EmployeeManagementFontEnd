import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeCreationComponent } from './conge-creation.component';

describe('CongeCreationComponent', () => {
  let component: CongeCreationComponent;
  let fixture: ComponentFixture<CongeCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CongeCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
