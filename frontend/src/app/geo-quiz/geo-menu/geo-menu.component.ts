import { Component,EventEmitter, Input, Output } from '@angular/core';
import { Continent } from '../../game-util';
@Component({
  selector: 'app-geo-menu',
  templateUrl: './geo-menu.component.html',
  styleUrls: ['./geo-menu.component.scss']
})
export class GeoMenuComponent {

  @Input()
  public continents: Continent[]=[];
  @Output() continentsChange = new EventEmitter<Continent[]>();

  @Input() startGame:() => void;

  @Input()
  public numberOfQuestions =3;
  @Output() protected numberOfQuestionsChange = new EventEmitter<number>();

  @Input()
  public time =30;
  @Output() protected timeChange = new EventEmitter<number>();

  constructor() {

  }

  protected disableStart():boolean{
    return this.continents.filter(c =>c.selected).length===0;


  }


  protected continentsValueChange():void{
    this.continentsChange.emit(this.continents);
  }

  protected plusNumberOfQuestions(){
    if(this.numberOfQuestions<5){
      this.numberOfQuestions+=1;
      this.numberOfQuestionsChange.emit(this.numberOfQuestions);
    }
  }

  protected minusNumberOfQuestions(){
    if(this.numberOfQuestions>2){
      this.numberOfQuestions-=1;
      this.numberOfQuestionsChange.emit(this.numberOfQuestions);
    }
  }

  protected plusTime(){
    if(this.time<100){
      this.time+=10;
      this.timeChange.emit(this.time);
    }
  }

  protected minusTime(){
    if(this.time>10){
      this.time-=10;
      this.timeChange.emit(this.time);
    }
  }


}
