import { Component, HostListener, OnInit, OnDestroy  } from '@angular/core';
import { updateWindowWidth,updateWindowHeight } from '../game-util';
import { interval, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Continent, GeoObject, countriesList, GeoAnwser } from '../game-util';

export type GeoQuizState = 'settings' | 'game' | 'end';
@Component({
  selector: 'app-geo-quiz',
  templateUrl: './geo-quiz.component.html',
  styleUrls: ['./geo-quiz.component.scss']
})
export class GeoQuizComponent implements OnInit, OnDestroy  {

  private windowWidth: number; 
  private windowHeight: number; 

  protected questions:GeoObject[] = [];
  protected question:GeoObject;
  private countries:{ [key: string]: string[][]; }={};

  private unsubscribe$: Subject<void> = new Subject<void>();

  public continents: Continent[]=[];

  protected geoData:GeoObject[] =[];

  protected gameState:GeoQuizState='settings';

  public numberOfQuestions = 3;


  protected anwsers:GeoAnwser[]=[];

  protected correct:GeoObject[] = [];

  protected wrongAnwser:GeoObject = null;  
  protected correctAnwser:GeoObject = null;  

  public time = 30;
  protected timeLeft = this.time;

  constructor() {
    this.countries=countriesList;
    this.continents=this.getContinents();
  }

  protected displayQuestionText():string {
    if(this.question) {
      return this.question.capital+" is the capital of?";
    } else {
      return "";
    }
  }

  private createQuestions() {
    if(this.correct.length === this.geoData.length) {
      this.gameState = 'end';
      this.timeLeft = 0;
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    } else {
      this.correctAnwser=null;
      this.wrongAnwser=null;
      let sq = [];
      for(let i=0;i<(this.geoData.length);i++){
        sq.push(i);
      }
      this.questions = [];
      let shuffledNumbers = sq.sort((a, b) => 0.5 - Math.random());
      for(let i=0;i<this.numberOfQuestions;i++){
        let gg =this.geoData[shuffledNumbers[i]];
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
    this.getGeoData();
    this.createQuestions();
    this.startCountdown();
  }

  public playAgain = () => { 
    this.gameState='settings'; 
  }


  checkAnswer(cc: GeoObject) {
    if(this.question === cc) {
      this.correctAnwser = cc;
      this.correct.push(cc);
    } else {
      this.correctAnwser = this.question;
      this.wrongAnwser = cc;
    }

    let anw:GeoAnwser = {countryCorrect:this.question,countryAnwsered:cc};
    this.anwsers.push(anw);
      setTimeout(() => {
        this.createQuestions();
      }, 1000);
    
  }

   getGeoData():void {
    this.geoData=[];
    for(let con of this.continents) {
      if(con.selected){
        for(let c of this.countries[con.continent]) {
          let g:GeoObject ={continent:con.continent,country:c[0],capital:c[1]};
          this.geoData.push(g);
        }
      }
    }
  }

  private getContinents():Continent[] {
    let list:Continent[] =[];
    for(let key in this.countries){
      list.push({continent:key,selected:false});
    }
    return list;
  }


  ngOnInit() {
    this.windowWidth = updateWindowWidth();
    this.windowHeight = updateWindowHeight();
  }

  protected sidesWidth():number {
    let width = window.innerWidth;
    return (width-this.windowWidth)/2;
  }

  protected sidesHeight():number {
    let height = window.innerHeight;
    return (height-this.windowHeight)/2;
  }   

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = updateWindowWidth();
    this.windowHeight = updateWindowHeight();
  }  
}
