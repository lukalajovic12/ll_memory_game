import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleMemoryComponent } from './circle-memory.component';

describe('CircleMemoryComponent', () => {
  let component: CircleMemoryComponent;
  let fixture: ComponentFixture<CircleMemoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CircleMemoryComponent]
    });
    fixture = TestBed.createComponent(CircleMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
