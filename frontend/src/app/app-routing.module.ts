import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CircleMemoryComponent } from './circle-memory/circle-memory.component';
import { GameScoreComponent } from './game-score/game-score.component';
import { SquareMemoryComponent } from './square-memory/square-memory.component';
const routes: Routes = [
  {path:'circle',component:CircleMemoryComponent},
  {path:'square',component:SquareMemoryComponent},  
  {path:'score',component:GameScoreComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
