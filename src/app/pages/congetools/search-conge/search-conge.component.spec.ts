import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  SearchCongeComponent } from './search-conge.component';

describe('SearchCongeComponent', () => {
  let component: SearchCongeComponent;
  let fixture: ComponentFixture<SearchCongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCongeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
