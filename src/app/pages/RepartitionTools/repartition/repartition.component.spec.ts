import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepartitionComponent } from './repartition.component';

describe('RepartitionComponent', () => {
  let component: RepartitionComponent;
  let fixture: ComponentFixture<RepartitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepartitionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepartitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
