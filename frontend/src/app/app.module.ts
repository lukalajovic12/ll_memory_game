import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CircleMemoryComponent } from './circle-memory/circle-memory.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { GameScoreComponent } from './game-score/game-score.component';
import { GameScoreChartComponent } from './game-score/game-score-chart/game-score-chart.component';
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
import { GeoDataComponent} from './geo-data/geo-data.component';
import { GeoQuizComponent } from './geo-quiz/geo-quiz.component';
import { GeoMenuComponent } from './geo-quiz/geo-menu/geo-menu.component';
import { GeoButtonComponent } from './geo-quiz/geo-button/geo-button.component';
import { GeoEndComponent } from './geo-quiz/geo-end/geo-end.component';
import { NimComponent } from './nim/nim.component';
import {NimMenuComponent} from './nim/nim-menu/nim-menu.component';

@NgModule({ declarations: [
        AppComponent,
        CircleMemoryComponent,
        GameScoreComponent,
        GameScoreChartComponent,
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
        GeoDataComponent,
        GeoQuizComponent,
        GeoMenuComponent,
        GeoButtonComponent,
        GeoEndComponent,
        NimComponent,
        NimMenuComponent
    ],
    bootstrap: [AppComponent], 
    imports: [ BrowserModule, AppRoutingModule, FormsModule, BrowserAnimationsModule ], 
    providers: [UserService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
