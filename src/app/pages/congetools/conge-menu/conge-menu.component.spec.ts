import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeMenuComponent } from './conge-menu.component';

describe('CongeMenuComponent', () => {
  let component: CongeMenuComponent;
  let fixture: ComponentFixture<CongeMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CongeMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
