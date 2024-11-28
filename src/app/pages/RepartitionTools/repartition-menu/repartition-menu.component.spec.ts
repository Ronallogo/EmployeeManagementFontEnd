import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepartitionMenuComponent } from './repartition-menu.component';

describe('RepartitionMenuComponent', () => {
  let component: RepartitionMenuComponent;
  let fixture: ComponentFixture<RepartitionMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepartitionMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepartitionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
