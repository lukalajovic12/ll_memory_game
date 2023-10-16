import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDataComponent } from './game-data.component';

describe('GameDataComponent', () => {
  let component: GameDataComponent;
  let fixture: ComponentFixture<GameDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameDataComponent]
    });
    fixture = TestBed.createComponent(GameDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
