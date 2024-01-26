import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CircleMemoryComponent } from './circle-memory/circle-memory.component';
import { GameScoreComponent } from './game-score/game-score.component';
import { SquareMemoryComponent } from './square-memory/square-memory.component';
import { HomeComponent } from './home/home.component';
import { GameSettingsComponent } from './game-settings/game-settings.component';
import { CIRCLES, SQUARES } from './game-util';
const routes: Routes = [
  {path:'',component:HomeComponent},
  {path: CIRCLES, component: CircleMemoryComponent} ,
  {path: SQUARES, component: SquareMemoryComponent} ,   
  {path: 'score', component:GameScoreComponent},
  {path: 'settings', component:GameSettingsComponent}    
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
