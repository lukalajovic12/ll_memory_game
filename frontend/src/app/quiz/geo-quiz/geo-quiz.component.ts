import { Component } from '@angular/core';
import { countriesList } from '../../game-util';
@Component({
  selector: 'app-geo-quiz',
  templateUrl: './geo-quiz.component.html',
  styleUrl: './geo-quiz.component.scss'
})
export class GeoQuizComponent {

  public countries:{ [key: string]: string[][]; }={};


  public displayQuestion: (QuizObject) => string = (question) => question.question+" is the capital of?";

  constructor() {

    this.countries=countriesList;
  }

}
