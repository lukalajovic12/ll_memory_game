import { Component, HostListener, OnInit, OnDestroy  } from '@angular/core';
import { Subject } from 'rxjs';
import { Line, evenPosition,oddMove,randomMove, NimStatus } from './nim-logic'
import {trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-nim',
  templateUrl: './nim.component.html',
  styleUrls: ['./nim.component.scss']
})
export class NimComponent implements OnInit, OnDestroy {


  protected firstPressX=-1;
  protected firstPressY=-1;
  protected secondPressX=-1;

  protected firstPressed = false;

  private markedElements=false;

  protected rows: Line[][] = [];

  protected playingGame = false;

  public status:NimStatus='instructions';
  
  protected windowWidth: number; 
  protected windowHeight: number;
  private unsubscribe$: Subject<void> = new Subject<void>();
  protected radius =6;

  private originalRowsLength =6;
  
  ngOnInit() {
    this.setupWidths();
  }

  private setupWidths():void {
    this.windowWidth = Math.min(window.innerWidth-60,500);
    this.windowHeight = window.innerHeight-50;
    if(this.playingGame){
      let maks =0;
      for(let r of this.rows) {
        if(r.length>maks) {
          maks=r.length;
        }
      }
      const maksRatio=this.windowWidth/maks;
      for(let i=0; i<this.rows.length;i++) {
        for(let j=0; j<this.rows[i].length;j++) {
          this.rows[i][j].x=j*maksRatio+maksRatio/2
          this.rows[i][j].y=i*(this.windowHeight/this.rows.length)+10;
        }
      }
    }

  }

  private createRows(): void {
    let nimNumbers = [];
    const l = Math.floor(3*Math.random())+3;
    for(let i=0;i<l;i++){
      let n = Math.floor(6*Math.random()+1);
        nimNumbers.push(n);
      
    }
    this.originalRowsLength=nimNumbers.length;
    const maks = nimNumbers.reduce((a, b) => Math.max(a, b), -Infinity);
    const maksRatio=this.windowWidth/maks;
    for(let i=0; i<nimNumbers.length;i++) {
      let row: Line[] = []
      for(let j=0; j<nimNumbers[i];j++) {
        let l:Line = {x:j*maksRatio+maksRatio/2, y:i*(this.windowHeight/nimNumbers.length)+10,choosen:false};
        row.push(l);
      }
      this.rows.push(row);
    }

    if(evenPosition(this.rows)){
      oddMove(this.rows);
      this.removeChoosen();
    }
  }

  protected lineLength():number {
    return this.windowHeight/this.originalRowsLength-20;

  }

  public startGame = () => {
    this.createRows();
    this.playingGame = true;
  }

  protected startMark(event: MouseEvent) {
    if(event.target instanceof SVGSVGElement) {
      const svgElement = event.target as SVGSVGElement;
      const point = svgElement.createSVGPoint();
      if (svgElement && point && svgElement.getScreenCTM()) {
        point.x = event.clientX;
        point.y = event.clientY;
        const svgPoint = point.matrixTransform(svgElement.getScreenCTM().inverse());
        const mouseX = svgPoint.x;
        const mouseY = svgPoint.y;
        this.firstPressX = mouseX;
        this.firstPressY = mouseY;
        this.firstPressed=true;
      }
  }
  }

  protected secondMark(event: MouseEvent) {
    if(event.target instanceof SVGSVGElement) {
      const svgElement = event.target as SVGSVGElement;
      const point = svgElement.createSVGPoint();
      if (svgElement && point && svgElement.getScreenCTM()) {
        point.x = event.clientX;
        const svgPoint = point.matrixTransform(svgElement.getScreenCTM().inverse());
        const mouseX = svgPoint.x;
        this.secondPressX = mouseX;
      }
  }
  }  

  protected startMarkTouch(event: TouchEvent) {
    if(event.target instanceof SVGSVGElement) {
      const svgElement = event.target as SVGSVGElement;
      const point = svgElement.createSVGPoint();
      if (svgElement && point && svgElement.getScreenCTM()) {
        point.x = event.touches[0].clientX;
        point.y = event.touches[0].clientY;
        const svgPoint = point.matrixTransform(svgElement.getScreenCTM().inverse());
        const mouseX = svgPoint.x;
        const mouseY = svgPoint.y;
        this.firstPressX = mouseX;
        this.firstPressY = mouseY;
        this.firstPressed=true;
      }
  }
  }

  protected secondMarkTouch(event: TouchEvent) {
    if(event.target instanceof SVGSVGElement) {
      const svgElement = event.target as SVGSVGElement;
      const point = svgElement.createSVGPoint();
      if (svgElement && point && svgElement.getScreenCTM()) {
        point.x = event.touches[0].clientX;
        const svgPoint = point.matrixTransform(svgElement.getScreenCTM().inverse());
        const mouseX = svgPoint.x;
        this.secondPressX = mouseX;
      }
  }
  }  

  private markChoosen():void {
    this.markedElements=false;
    for(let row of this.rows){
      for(let line of row) {
        if(line.x>= Math.min(this.firstPressX,this.secondPressX) && line.x<= Math.max(this.firstPressX,this.secondPressX) 
        && line.y<=this.firstPressY && (line.y+this.lineLength())>=this.firstPressY
        ) {
          line.choosen=true;
          this.markedElements=true;
        }
      }
    }
  }

  private removeChoosen():void {
    for(let i=0; i<this.rows.length;i++){
      this.rows[i]= this.rows[i].filter(l => !l.choosen)
    }
    this.rows =this.rows.filter(r => r.length>0);
  }  

  protected async nimMove(): Promise<void> {
    this.firstPressed=false;
    this.markChoosen();
    if(this.markedElements) {
      await this.sleep(300);
      this.removeChoosen();
      if(this.rows.length>0) {
      await this.sleep(300);
      if(evenPosition(this.rows)){
        randomMove(this.rows);
      } else {
        oddMove(this.rows);
      }
      await this.sleep(300);
      this.removeChoosen();
      if(this.rows.length===0) {
        this.playingGame=false;
        this.status='loose';
      }
    } else {

      this.playingGame=false;
      this.status='win';
    }
    }
  }


  protected sleep(ms: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  protected sidesWidth():number {
    let width = window.innerWidth;
    return width;
  }

  protected sidesHeight():number {
    let height = window.innerHeight;
    return (height-this.windowHeight)/2;
  }   

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setupWidths();
  }  

}
