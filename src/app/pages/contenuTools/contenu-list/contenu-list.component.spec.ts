import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenuListComponent } from './contenu-list.component';

describe('ContenuListComponent', () => {
  let component: ContenuListComponent;
  let fixture: ComponentFixture<ContenuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenuListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
