import { Component } from '@angular/core';

@Component({
  selector: 'app-greek-alphabet-quiz',
  templateUrl: './greek-alphabet-quiz.component.html',
  styleUrl: './greek-alphabet-quiz.component.scss'
})
export class GreekAlphabetQuizComponent {

  public displayQuestion: (QuizObject) => string = (question) => question.question+" is the greek letter?";


  private greekAlphabet: string[][] = [
    ['Alpha', 'Α', 'α'],
    ['Beta', 'Β', 'β'],
    ['Gamma', 'Γ', 'γ'],
    ['Delta', 'Δ', 'δ'],
    ['Epsilon', 'Ε', 'ε'],
    ['Zeta', 'Ζ', 'ζ'],
    ['Eta', 'Η', 'η'],
    ['Theta', 'Θ', 'θ'],
    ['Iota', 'Ι', 'ι'],
    ['Kappa', 'Κ', 'κ'],
    ['Lambda', 'Λ', 'λ'],
    ['Mu', 'Μ', 'μ'],
    ['Nu', 'Ν', 'ν'],
    ['Xi', 'Ξ', 'ξ'],
    ['Omicron', 'Ο', 'ο'],
    ['Pi', 'Π', 'π'],
    ['Rho', 'Ρ', 'ρ'],
    ['Sigma', 'Σ', 'σ'],
    ['Tau', 'Τ', 'τ'],
    ['Upsilon', 'Υ', 'υ'],
    ['Phi', 'Φ', 'φ'],
    ['Chi', 'Χ', 'χ'],
    ['Psi', 'Ψ', 'ψ'],
    ['Omega', 'Ω', 'ω']
  ];

  public convertLetters():{ [key: string]: string[][]; } {
    return  {'alphabet':this.greekAlphabet.map(g =>[g[2],g[0]])}
  }

}
