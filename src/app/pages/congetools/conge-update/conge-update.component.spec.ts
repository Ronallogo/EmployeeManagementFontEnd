import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeUpdateComponent } from './conge-update.component';

describe('CongeUpdateComponent', () => {
  let component: CongeUpdateComponent;
  let fixture: ComponentFixture<CongeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CongeUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
