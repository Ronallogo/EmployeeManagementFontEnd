import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepartitionSearchComponent } from './repartition-search.component';

describe('RepartitionSearchComponent', () => {
  let component: RepartitionSearchComponent;
  let fixture: ComponentFixture<RepartitionSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepartitionSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepartitionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
