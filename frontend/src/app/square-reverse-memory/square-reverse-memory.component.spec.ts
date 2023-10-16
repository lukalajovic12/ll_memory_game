import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareReverseMemoryComponent } from './square-reverse-memory.component';

describe('SquareReverseMemoryComponent', () => {
  let component: SquareReverseMemoryComponent;
  let fixture: ComponentFixture<SquareReverseMemoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SquareReverseMemoryComponent]
    });
    fixture = TestBed.createComponent(SquareReverseMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
