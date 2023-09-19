import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CircleMemoryComponent } from './circle-memory/circle-memory.component';
import { GameScoreComponent } from './game-score/game-score.component';

const routes: Routes = [
  {path:'',component:CircleMemoryComponent},
  {path:'score',component:GameScoreComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
