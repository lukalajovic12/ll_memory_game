import { Component, HostListener ,Input, OnInit } from '@angular/core';
import { updateWindowWidth } from 'src/app/game-util';
@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent implements OnInit {

  @Input() action: () => void;

  @Input() text: string;

  invokeAction(): void {
    if (this.action) {
      this.action();
    }
  }


  private windowHeight: number;
  protected windowSize: number;

  protected buttonDivPadding():number {
    return this.windowHeight/32;   
  }

  protected buttonHeight():number {
    return this.windowHeight/16;
  }

  ngOnInit() {
    this.windowSize = updateWindowWidth();
    this.windowHeight = window.innerHeight;
  }  
  // HostListener to listen for window resize event
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowHeight = window.innerHeight;
    this.windowSize = updateWindowWidth();
  }    

}
