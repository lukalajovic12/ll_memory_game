import { Component, Input } from '@angular/core';
import { QuizAnwser, QuizObject } from '../../game-util';
import { Location } from '@angular/common';
@Component({
  selector: 'app-quiz-end',
  templateUrl: './quiz-end.component.html',
  styleUrls: ['./quiz-end.component.scss']
})
export class QuizEndComponent {

  @Input() anwsers: QuizAnwser[] =[];

  @Input() action: () => void;

  @Input() displayQuestion: (QuizObject) => string;

  constructor(private location: Location) {
  }

  invokeAction(): void {
    if (this.action) {
      this.action();
    }
  }  

  protected toHome():void {
    this.location.back();
  }  

}
