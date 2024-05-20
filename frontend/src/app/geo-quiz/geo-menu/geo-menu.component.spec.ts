import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoMenuComponent } from './geo-menu.component';

describe('GeoMenuComponent', () => {
  let component: GeoMenuComponent;
  let fixture: ComponentFixture<GeoMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeoMenuComponent]
    });
    fixture = TestBed.createComponent(GeoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
