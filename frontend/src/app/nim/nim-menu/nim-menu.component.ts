import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NimStatus } from './../nim-logic';
@Component({
  selector: 'app-nim-menu',
  templateUrl: './nim-menu.component.html',
  styleUrl: './nim-menu.component.scss'
})
export class NimMenuComponent {

  @Input() action: () => void;
  @Input() status:NimStatus;

  constructor(private router: Router){
  }

  protected toHome = () => {
    this.router.navigate(['/']);
  }


}
