import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskInsertionListComponent } from './task-insertion-list.component';

describe('TaskInsertionListComponent', () => {
  let component: TaskInsertionListComponent;
  let fixture: ComponentFixture<TaskInsertionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskInsertionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskInsertionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
