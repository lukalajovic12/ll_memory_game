import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from '../user.service';
import { CIRCLES, SQUARES } from '../game-util';

@Component({
  selector: 'app-game-tutorial',
  templateUrl: './game-tutorial.component.html',
  styleUrls: ['./game-tutorial.component.scss']
})
export class GameTutorialComponent  implements OnInit {

  private gameType:string =SQUARES;


  constructor(private route: ActivatedRoute,
    private router: Router,
    protected _userService: UserService) {
    }

    

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => this.gameType=params['title']
      )
    }

    protected displayTutorial():string{
      let gameTutorial ="";
      if(this.gameType === SQUARES){
        let gameTutorial = "Several squares on the grid will color green. "
        gameTutorial += "After a few seconds they will change back to gray. ";
        gameTutorial += "Remember when they were and click on them.";    
        return gameTutorial;
      }
      if(this.gameType === CIRCLES){
        let gameTutorial = "Several circles will appear on the screen with numbers from 1 up."
        gameTutorial += "The numbers will dissapear.";
        gameTutorial += "First click on where number 1 was then 2 till you get to the last one";            
        return gameTutorial;
      }
      gameTutorial += "If you are succsessfull the game will become more difficult.";     
      gameTutorial += "You are allowed to make 1 mistake.";
      gameTutorial += "And you have 3 lives.";   
      gameTutorial += "Have fun.";  
      return gameTutorial;
    }


    protected displaySettings():string{
      let gameSettings = "In settings you can change how many lives you have, ";
      gameSettings +="how many mistakes you can make and all other factors."
      gameSettings+="These setting hovewer only apply in training games";
      return gameSettings;
    }

    protected toBack():void {
      let url = '/'+this.gameType;
      this.router.navigate([url]);
    }  


}
