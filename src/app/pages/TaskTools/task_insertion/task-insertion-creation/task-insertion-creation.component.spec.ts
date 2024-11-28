import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskInsertionCreationComponent } from './task-insertion-creation.component';

describe('TaskInsertionCreationComponent', () => {
  let component: TaskInsertionCreationComponent;
  let fixture: ComponentFixture<TaskInsertionCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskInsertionCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskInsertionCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
