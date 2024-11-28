import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskInsertionUpdateComponent } from './task-insertion-update.component';

describe('TaskInsertionUpdateComponent', () => {
  let component: TaskInsertionUpdateComponent;
  let fixture: ComponentFixture<TaskInsertionUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskInsertionUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskInsertionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
