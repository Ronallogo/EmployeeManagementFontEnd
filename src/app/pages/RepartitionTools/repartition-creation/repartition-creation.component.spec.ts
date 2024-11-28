import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepartitionCreationComponent } from './repartition-creation.component';

describe('RepartitionCreationComponent', () => {
  let component: RepartitionCreationComponent;
  let fixture: ComponentFixture<RepartitionCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepartitionCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepartitionCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
