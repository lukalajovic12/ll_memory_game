import { Component, Input } from '@angular/core';
import { AreaBase } from 'src/app/area-base';
@Component({
  selector: 'app-quiz-button',
  templateUrl: './quiz-button.component.html',
  styleUrls: ['./quiz-button.component.scss']
})
export class QuizButtonComponent extends AreaBase {
  @Input() action: () => void;

  @Input() text: string;

  @Input() correctAnwser: boolean;
  @Input() wrongAnwser:boolean;

  invokeAction(): void {
    if (this.action) {
      this.action();
    }
  }
}
