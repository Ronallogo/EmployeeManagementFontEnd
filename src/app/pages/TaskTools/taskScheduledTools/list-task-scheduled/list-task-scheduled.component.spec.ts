import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTaskScheduledComponent } from './list-task-scheduled.component';

describe('ListTaskScheduledComponent', () => {
  let component: ListTaskScheduledComponent;
  let fixture: ComponentFixture<ListTaskScheduledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTaskScheduledComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTaskScheduledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
