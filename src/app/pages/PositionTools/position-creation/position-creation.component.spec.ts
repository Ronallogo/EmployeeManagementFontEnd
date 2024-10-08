import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionCreationComponent } from './position-creation.component';

describe('PositionCreationComponent', () => {
  let component: PositionCreationComponent;
  let fixture: ComponentFixture<PositionCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
