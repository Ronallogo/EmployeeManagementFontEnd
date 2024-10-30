import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskScheduledUpdateComponent } from './task-scheduled-update.component';

describe('TaskScheduledEditComponent', () => {
  let component: TaskScheduledUpdateComponent;
  let fixture: ComponentFixture<TaskScheduledUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskScheduledUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskScheduledUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
