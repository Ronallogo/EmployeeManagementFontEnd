import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenuCreationComponent } from './contenu-creation.component';

describe('ContenuCreationComponent', () => {
  let component: ContenuCreationComponent;
  let fixture: ComponentFixture<ContenuCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenuCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenuCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
