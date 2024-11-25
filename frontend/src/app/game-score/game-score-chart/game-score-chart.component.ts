import { Component, Input, OnInit } from '@angular/core';
import { Score } from '../../game-util';
import { AreaBase } from 'src/app/area-base';


@Component({
  selector: 'app-game-score-chart',
  templateUrl: './game-score-chart.component.html',
  styleUrl: './game-score-chart.component.scss'
})
export class GameScoreChartComponent extends AreaBase implements OnInit{

  @Input() score: Score[]=[];

  protected pathData: string = '';

  protected xNumbers:{x:number,display:number}[]=[];

  protected yNumbers:{y:number,display:number}[]=[];

  protected chartMaginX=20;
  protected chartMaginY=10;

  override ngOnInit() {
    super.ngOnInit();
    this.generateSplinePath();
  }

  generateSplinePath(): void {
    if (this.score.length > 2) {
    this.pathData="";
    this.xNumbers=[];
    this.yNumbers=[];


    const maxItem = this.score.reduce((max, item) => item.points > max.points ? item : max, this.score[0]);
   
    const points:{x:number,y:number}[] =[];
    const  width=this.windowWidth-this.chartMaginX/2;
    const  height=this.windowHeight-this.chartMaginY;    

    for(let i=0;i< this.score.length;i++) {
      const xx1 =(width-this.chartMaginX)*i/(this.score.length-1)+this.chartMaginX;
      const yy1 = this.windowHeight - (height-this.chartMaginY)*this.score[i].points/maxItem.points-this.chartMaginY;
  
      points.push({x:xx1,y:yy1});
      const xx2 =(width-this.chartMaginX)*i/(this.score.length-1)+this.chartMaginX;
      const yy2 = this.windowHeight-height*this.score[i].points/maxItem.points;

      this.xNumbers.push({x:xx2,display:i});
      this.yNumbers.push({y:yy2+10,display:this.score[i].points});
    }
   
  
  
      // Move to the first point
      let path = `M ${points[0].x},${points[0].y}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];

        // Calculate control points
        const dx = (p1.x - p0.x) * 0.3;
        const dy = (p1.y - p0.y) * 0.3;

        const controlPoint1 = { x: p0.x + dx, y: p0.y + dy };
        const controlPoint2 = { x: p1.x - dx, y: p1.y - dy };

        // Cubic Bézier curve segment
        path += ` C ${controlPoint1.x},${controlPoint1.y} ${controlPoint2.x},${controlPoint2.y} ${p1.x},${p1.y}`;
      }

      this.pathData = path;
  }
  else {
    this.pathData = "";
  }
  }

 
}
