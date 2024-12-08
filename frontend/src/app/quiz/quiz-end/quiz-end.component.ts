import { Component, Input } from '@angular/core';
import { QuizAnwser } from '../../game-util';
@Component({
  selector: 'app-quiz-end',
  templateUrl: './quiz-end.component.html',
  styleUrls: ['./quiz-end.component.scss']
})
export class QuizEndComponent {

  @Input() anwsers: QuizAnwser[] =[];

  @Input() action: () => void;

  invokeAction(): void {
    if (this.action) {
      this.action();
    }
  }  

}
