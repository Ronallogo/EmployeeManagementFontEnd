import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskScheduledMenuComponent } from './task-scheduled-menu.component';

describe('TaskScheduledMenuComponent', () => {
  let component: TaskScheduledMenuComponent;
  let fixture: ComponentFixture<TaskScheduledMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskScheduledMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskScheduledMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
