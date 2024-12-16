import { Component } from '@angular/core';

@Component({
  selector: 'app-ukranian-cirilic-alphabet-quiz',
  templateUrl: './ukranian-cirilic-alphabet-quiz.component.html',
  styleUrl: './ukranian-cirilic-alphabet-quiz.component.scss'
})
export class UkranianCirilicAlphabetQuizComponent {

  public displayQuestion: (QuizObject) => string = (question) => question.question+" pomeni?";


  private ukranianCirilic: string[][] = [
    ['A', 'А', 'а'],
    ['B', 'Б', 'б'],
    ['C', 'Ц', 'ц'],
    ['Č', 'Ч', 'ч'],
    ['D', 'Д', 'д'],
    ['E', 'Е', 'е'],
    ['F', 'Ф', 'ф'],
    ['G', 'Г', 'г'],
    ['H', 'Х', 'х'],
    ['I', 'І', 'і'],
    ['J', 'Й', 'й'],
    ['K', 'К', 'к'],
    ['L', 'Л', 'л'],
    ['Lj', 'Љ', 'љ'],
    ['M', 'М', 'м'],
    ['N', 'Н', 'н'],
    ['Nj', 'Њ', 'њ'],
    ['O', 'О', 'о'],
    ['P', 'П', 'п'],
    ['R', 'Р', 'р'],
    ['S', 'С', 'с'],
    ['Š', 'Ш', 'ш'],
    ['T', 'Т', 'т'],
    ['U', 'У', 'у'],
    ['V', 'В', 'в'],
    ['Z', 'З', 'з'],
    ['Ž', 'Ж', 'ж'],
    ['**Y**', 'Ы', 'ы'],
    ['**Ye**', 'Э', 'э'],
    ['**Yo**', 'Ё', 'ё'],
    ['**Yu**', 'Ю', 'ю'],
    ['**Ya**', 'Я', 'я']
  ];


  public convertLetters():{ [key: string]: string[][]; } {
    return  {'alphabet':this.ukranianCirilic.map(g =>[g[2],g[0]])}
  }


}
