import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoButtonComponent } from './geo-button.component';

describe('GeoButtonComponent', () => {
  let component: GeoButtonComponent;
  let fixture: ComponentFixture<GeoButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeoButtonComponent]
    });
    fixture = TestBed.createComponent(GeoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
