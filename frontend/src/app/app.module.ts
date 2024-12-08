import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CircleMemoryComponent } from './circle-memory/circle-memory.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { GameScoreComponent } from './game-score/game-score.component';
import { GameScoreChartComponent } from './game-score/game-score-chart/game-score-chart.component';
import { GameScoreTableComponent } from './game-score/game-score-table/game-score-table.component';
import { SquareMemoryComponent } from './square-memory/square-memory.component';
import { GameTemplateComponent } from './game-template/game-template.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameSettingsComponent } from './game-settings/game-settings.component';
import { HomeMenuComponent } from './home/home-menu/home-menu.component';
import { GameMenuComponent } from './game-template/game-menu/game-menu.component';
import { GamePauseComponent } from './game-template/game-pause/game-pause.component';
import { GameEndComponent } from './game-template/game-end/game-end.component';
import { GameTutorialComponent } from './game-tutorial/game-tutorial.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { MenuButtonComponent } from './menu-button/menu-button.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizMenuComponent } from './quiz/quiz-menu/quiz-menu.component';
import { QuizButtonComponent } from './quiz/quiz-button/quiz-button.component';
import { QuizEndComponent } from './quiz/quiz-end/quiz-end.component';
import { NimComponent } from './nim/nim.component';
import { NimMenuComponent } from './nim/nim-menu/nim-menu.component';
import { GeoQuizComponent } from './quiz/geo-quiz/geo-quiz.component'

@NgModule({ declarations: [
        AppComponent,
        CircleMemoryComponent,
        GameScoreComponent,
        GameScoreChartComponent,
        GameScoreTableComponent,
        SquareMemoryComponent,
        GameTemplateComponent,
        HomeComponent,
        RegistrationComponent,
        LoginComponent,
        GameSettingsComponent,
        HomeMenuComponent,
        GameMenuComponent,
        GamePauseComponent,
        GameEndComponent,
        GameTutorialComponent,
        LeaderboardComponent,
        MenuButtonComponent,
        QuizComponent,
        QuizMenuComponent,
        QuizButtonComponent,
        QuizEndComponent,
        NimComponent,
        NimMenuComponent,
        GeoQuizComponent
    ],
    bootstrap: [AppComponent], 
    imports: [ BrowserModule, AppRoutingModule, FormsModule, BrowserAnimationsModule ], 
    providers: [UserService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
