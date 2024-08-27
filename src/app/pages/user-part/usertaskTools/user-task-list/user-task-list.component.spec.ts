import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTaskListComponent } from './user-task-list.component';

describe('UserTaskListComponent', () => {
  let component: UserTaskListComponent;
  let fixture: ComponentFixture<UserTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTaskListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
