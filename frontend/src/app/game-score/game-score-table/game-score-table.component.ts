import { Component, Input } from '@angular/core';
import { Score } from '../../game-util';
import { AreaBase } from 'src/app/area-base';
import {Gametype} from 'src/app/game-score/game-score.component'
@Component({
  selector: 'app-game-score-table',
  standalone: false,
  templateUrl: './game-score-table.component.html',
  styleUrl: './game-score-table.component.scss'
})
export class GameScoreTableComponent extends AreaBase {

  @Input() score: Score[]=[];

  @Input() gameType: Gametype; 

}
