import { Component, HostListener, OnInit, OnDestroy  } from '@angular/core';
import { interval, Subject } from 'rxjs';
import {Line} from './nim-logic'

@Component({
  selector: 'app-nim',
  templateUrl: './nim.component.html',
  styleUrls: ['./nim.component.scss']
})
export class NimComponent implements OnInit, OnDestroy {




  public nimNumbers = [5,4,3,2,1];
  

  public createRows(): Line[][] {
    let rows: Line[][] = []
    const maks = this.nimNumbers.reduce((a, b) => Math.max(a, b), -Infinity);
    for(let i=0; i<this.nimNumbers.length;i++) {
      let row: Line[] = []
      for(let j=0; j<this.nimNumbers[i];j++) {
        let l:Line = {y:i*(this.windowHeight/this.nimNumbers.length),x:j*(this.windowWidth/maks),choosen:false};
        row.push(l);
      }
      rows.push(row);

    }


    return rows;
  }


  protected lineLength():number {
    return this.windowHeight/this.nimNumbers.length-20;

  }

  protected windowWidth: number; 
  protected windowHeight: number;

  private unsubscribe$: Subject<void> = new Subject<void>();

  protected radius =10;


  ngOnInit() {
    this.windowWidth = Math.min(window.innerWidth,600);
    this.windowHeight = window.innerHeight-50;


  }



  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  protected sidesWidth():number {
    let width = window.innerWidth;
    return width;
    // return (width-this.windowWidth)/2;
  }

  protected sidesHeight():number {
    let height = window.innerHeight;
    return (height-this.windowHeight)/2;
  }   

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = Math.min(window.innerWidth,600);
    this.windowHeight = window.innerHeight-50;
  }  

}
