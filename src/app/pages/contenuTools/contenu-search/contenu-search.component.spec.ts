import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenuSearchComponent } from './contenu-search.component';

describe('ContenuSearchComponent', () => {
  let component: ContenuSearchComponent;
  let fixture: ComponentFixture<ContenuSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenuSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenuSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
