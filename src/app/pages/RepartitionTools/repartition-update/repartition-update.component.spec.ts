import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepartitionUpdateComponent } from './repartition-update.component';

describe('RepartitionUpdateComponent', () => {
  let component: RepartitionUpdateComponent;
  let fixture: ComponentFixture<RepartitionUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepartitionUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepartitionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
