import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskScheduledCreationComponent } from './task-scheduled-creation.component';

describe('UserTaskComponent', () => {
  let component: TaskScheduledCreationComponent;
  let fixture: ComponentFixture<TaskScheduledCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskScheduledCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskScheduledCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
