import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './square-reverse-memory/app-routing.module';
import { AppComponent } from './app.component';
import { CircleMemoryComponent } from './circle-memory/circle-memory.component';
import { HttpClientModule} from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { GameScoreComponent } from './game-score/game-score.component';
import { SquareMemoryComponent } from './square-memory/square-memory.component';
import { GameDataComponent } from './game-data/game-data.component';
import { HomeComponent } from './home/home.component';
import { SquareReverseMemoryComponent } from './square-reverse-memory/square-reverse-memory.component';

@NgModule({
  declarations: [
    AppComponent,
    CircleMemoryComponent,
    GameScoreComponent,
    SquareMemoryComponent,
    GameDataComponent,
    HomeComponent,
    SquareReverseMemoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
