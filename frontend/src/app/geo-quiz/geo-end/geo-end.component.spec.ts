import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoEndComponent } from './geo-end.component';

describe('GeoEndComponent', () => {
  let component: GeoEndComponent;
  let fixture: ComponentFixture<GeoEndComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeoEndComponent]
    });
    fixture = TestBed.createComponent(GeoEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
