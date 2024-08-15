import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenuUpdateComponent } from './contenu-update.component';

describe('ContenuUpdateComponent', () => {
  let component: ContenuUpdateComponent;
  let fixture: ComponentFixture<ContenuUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenuUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenuUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
