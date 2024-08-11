import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionMenuComponent } from './position-menu.component';

describe('PositionMenuComponent', () => {
  let component: PositionMenuComponent;
  let fixture: ComponentFixture<PositionMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
