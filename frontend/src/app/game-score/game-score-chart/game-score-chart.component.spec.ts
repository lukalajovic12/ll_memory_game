import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameScoreChartComponent } from './game-score-chart.component';

describe('GameScoreChartComponent', () => {
  let component: GameScoreChartComponent;
  let fixture: ComponentFixture<GameScoreChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameScoreChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameScoreChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
