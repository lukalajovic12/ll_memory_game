import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCanvasDataComponent } from './game-canvas-data.component';

describe('GameCanvasDataComponent', () => {
  let component: GameCanvasDataComponent;
  let fixture: ComponentFixture<GameCanvasDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameCanvasDataComponent]
    });
    fixture = TestBed.createComponent(GameCanvasDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
