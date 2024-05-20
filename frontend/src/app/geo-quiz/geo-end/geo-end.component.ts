import { Component, Input } from '@angular/core';
import { GeoAnwser } from '../../game-util';
@Component({
  selector: 'app-geo-end',
  templateUrl: './geo-end.component.html',
  styleUrls: ['./geo-end.component.scss']
})
export class GeoEndComponent {

  @Input() anwsers: GeoAnwser[] =[];

  @Input() action: () => void;

  invokeAction(): void {
    if (this.action) {
      this.action();
    }
  }  

}
