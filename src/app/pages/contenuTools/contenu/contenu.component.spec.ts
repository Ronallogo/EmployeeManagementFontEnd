import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenuComponent } from './contenu.component';

describe('ContenuComponent', () => {
  let component: ContenuComponent;
  let fixture: ComponentFixture<ContenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
