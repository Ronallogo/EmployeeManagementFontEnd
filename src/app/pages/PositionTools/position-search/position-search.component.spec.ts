import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionSearchComponent } from './position-search.component';

describe('PositionSearchComponent', () => {
  let component: PositionSearchComponent;
  let fixture: ComponentFixture<PositionSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
