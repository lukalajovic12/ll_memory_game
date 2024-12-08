import { Component, Input, OnDestroy, OnInit  } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Category, QuizObject, QuizAnwser } from '../game-util';
import { AreaBase } from '../area-base';

export type QuizState = 'settings' | 'game' | 'end';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent extends AreaBase implements OnDestroy, OnInit  {

  protected questions:QuizObject[] = [];
  protected question:QuizObject;

  @Input()
  public title:string;
  @Input()
  public chooseCategories:string;

  @Input()
  public quizList:{ [key: string]: string[][]; }={};

  @Input() displayQuestion: (QuizObject) => string;

  private unsubscribe$: Subject<void> = new Subject<void>();

  public categories: Category[]= [];

  protected quizData:QuizObject[] = [];

  protected gameState:QuizState='settings';

  public numberOfQuestions = 3;


  protected anwsers:QuizAnwser[]=[];

  protected correct:QuizObject[] = [];

  protected wrongAnwser:QuizObject = null;  
  protected correctAnwser:QuizObject = null;  

  public time = 30;
  protected timeLeft = this.time;

  constructor() {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();
    this.categories=this.getCategories();
  }

  protected displayQuestionText():string {
    if(this.question) {
      return this.displayQuestion(this.question);
    } else {
      return "";
    }
  }

  private createQuestions() {
    if(this.correct.length === this.quizData.length) {
      this.gameState = 'end';
      this.timeLeft = 0;
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    } else {
      this.correctAnwser=null;
      this.wrongAnwser=null;
      let sq = [];
      for(let i=0;i<(this.quizData.length);i++){
        sq.push(i);
      }
      this.questions = [];
      let shuffledNumbers = sq.sort((a, b) => 0.5 - Math.random());
      for(let i=0;i<this.numberOfQuestions;i++){
        let gg =this.quizData[shuffledNumbers[i]];
        this.questions.push(gg);
      }
      this.question=this.questions[0];
      this.question=this.questions[Math.floor(Math.random()*this.numberOfQuestions)];

      if(this.correct.includes(this.question)) {
        this.createQuestions();
      }
  }
  }

  startCountdown() {
    interval(1000)
      .pipe(
        takeUntil(this.unsubscribe$),
        take(this.time + 1)
      )
      .subscribe(() => {
        if (this.timeLeft > 0) {
            this.timeLeft--;
        } else {
          this.gameState = 'end';
          this.timeLeft = this.time;
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public startGame = () => {
    this.gameState='game'; 
    this.timeLeft = this.time;
    this.correct = [];
    this.anwsers = [];
    this.getQuizData();
    this.createQuestions();
    this.startCountdown();
  }

  public playAgain = () => { 
    this.gameState='settings'; 
  }


  checkAnswer(cc: QuizObject) {
    if(this.question === cc) {
      this.correctAnwser = cc;
      this.correct.push(cc);
    } else {
      this.correctAnwser = this.question;
      this.wrongAnwser = cc;
    }

    let anw:QuizAnwser = {countryCorrect:this.question,countryAnwsered:cc};
    this.anwsers.push(anw);
      setTimeout(() => {
        this.createQuestions();
      }, 1000);
    
  }

  protected getQuizData():void {
    this.quizData=[];
    for(let con of this.categories) {
      if(con.selected){
        for(let c of this.quizList[con.category]) {
          let q:QuizObject ={categoy:con.category, anwser:c[0],question:c[1]};
          this.quizData.push(q);
        }
      }
    }
  }

  private getCategories():Category[] {
    let list:Category[] =[];
    for(let key in this.quizList){
      list.push({category:key,selected:false});
    }
    return list;
  }

}
