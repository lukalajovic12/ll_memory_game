
import { Directive, HostBinding ,HostListener, OnInit } from '@angular/core';
import { updateWindowWidth,updateWindowHeight } from './game-util';


@Directive()
export abstract class AreaBase implements OnInit {
    @HostBinding('style.--window-width.px')
    protected windowWidth: number; 
  
    @HostBinding('style.--window-height.px')
    protected windowHeight: number;
  
    @HostBinding('style.--sides-width.px')
    protected sidesWidth: number;

    ngOnInit() {
        this.updateSizes();
      }
    
      @HostListener('window:resize', ['$event'])
      onResize(event: any) {
        this.updateSizes();
      } 
      
      private updateSizes() {
        this.windowWidth = updateWindowWidth();
        this.windowHeight = updateWindowHeight();
        this.sidesWidth= (window.innerWidth-this.windowWidth)/2;
      }    


}