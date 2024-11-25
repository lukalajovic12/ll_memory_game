import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameScoreTableComponent } from './game-score-table.component';

describe('GameScoreTableComponent', () => {
  let component: GameScoreTableComponent;
  let fixture: ComponentFixture<GameScoreTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameScoreTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameScoreTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
