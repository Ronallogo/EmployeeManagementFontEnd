import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskScheduledSearchComponent } from './task-scheduled-search.component';

describe('TaskSheduledSearchComponent', () => {
  let component: TaskScheduledSearchComponent;
  let fixture: ComponentFixture<TaskScheduledSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskScheduledSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskScheduledSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
