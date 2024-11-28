import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepartitionListComponent } from './repartition-list.component';

describe('RepartitionListComponent', () => {
  let component: RepartitionListComponent;
  let fixture: ComponentFixture<RepartitionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepartitionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepartitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
