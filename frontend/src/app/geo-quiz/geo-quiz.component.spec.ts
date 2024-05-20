import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoQuizComponent } from './geo-quiz.component';

describe('GeoQuizComponent', () => {
  let component: GeoQuizComponent;
  let fixture: ComponentFixture<GeoQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeoQuizComponent]
    });
    fixture = TestBed.createComponent(GeoQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
