import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareMemoryComponent } from './square-memory.component';

describe('SquareMemoryComponent', () => {
  let component: SquareMemoryComponent;
  let fixture: ComponentFixture<SquareMemoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SquareMemoryComponent]
    });
    fixture = TestBed.createComponent(SquareMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
