import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameEndComponent } from './game-end.component';

describe('GameEndComponent', () => {
  let component: GameEndComponent;
  let fixture: ComponentFixture<GameEndComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameEndComponent]
    });
    fixture = TestBed.createComponent(GameEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
