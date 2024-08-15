import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenuMenuComponent } from './contenu-menu.component';

describe('ContenuMenuComponent', () => {
  let component: ContenuMenuComponent;
  let fixture: ComponentFixture<ContenuMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenuMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenuMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
