import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyComponent } from './notify.component';

describe('NotifyComponent', () => {
  let component: NotifyComponent;
  let fixture: ComponentFixture<NotifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
