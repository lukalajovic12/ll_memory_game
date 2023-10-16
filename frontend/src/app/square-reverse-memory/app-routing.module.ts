import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CircleMemoryComponent } from '../circle-memory/circle-memory.component';
import { GameScoreComponent } from '../game-score/game-score.component';
import { SquareMemoryComponent } from '../square-memory/square-memory.component';
import { SquareReverseMemoryComponent } from './square-reverse-memory.component';

import { HomeComponent } from '../home/home.component';
const routes: Routes = [
  {path:'',component:HomeComponent,children:[
    { path: 'circles', component: CircleMemoryComponent },
    { path: 'squares', component: SquareMemoryComponent },   
    { path: 'squares-reverse', component: SquareReverseMemoryComponent },   
  ]},  
  {path:'score',component:GameScoreComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
