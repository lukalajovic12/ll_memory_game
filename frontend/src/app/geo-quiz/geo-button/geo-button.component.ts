import { Component, HostListener ,Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-geo-button',
  templateUrl: './geo-button.component.html',
  styleUrls: ['./geo-button.component.scss']
})
export class GeoButtonComponent implements OnInit {
  @Input() action: () => void;

  @Input() text: string;


  @Input() correctAnwser: boolean;
  @Input() wrongAnwser:boolean;

  private windowHeight: number;
  protected windowSize: number;

  ngOnInit() {
    this.windowSize = this.updateButtonWidth();
    this.windowHeight = window.innerHeight;
  }  

  invokeAction(): void {
    if (this.action) {
      this.action();
    }
  }
  
  protected buttonDivPadding():number {
    return this.windowHeight/32;   
  }

  protected buttonHeight():number {
    return this.windowHeight/16;
  }

  // HostListener to listen for window resize event
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowHeight = window.innerHeight;
    this.windowSize = this.updateButtonWidth();
  }    

  private updateButtonWidth(): number {
    // Use Renderer2 to get the window size
    const width = window.innerWidth;
    // Store the window size in your class property
    let maxSize=500;
    return Math.min(width,maxSize);
  }  

}
