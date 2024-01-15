import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CircleMemoryComponent } from './circle-memory/circle-memory.component';
import { HttpClientModule} from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { GameScoreComponent } from './game-score/game-score.component';
import { SquareMemoryComponent } from './square-memory/square-memory.component';
import { GameTemplateComponent } from './game-template/game-template.component';
import { HomeComponent } from './home/home.component';
import { SquareReverseMemoryComponent } from './square-reverse-memory/square-reverse-memory.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameSettingsComponent } from './game-settings/game-settings.component';


@NgModule({
  declarations: [
    AppComponent,
    CircleMemoryComponent,
    GameScoreComponent,
    SquareMemoryComponent,
    GameTemplateComponent,
    HomeComponent,
    SquareReverseMemoryComponent,
    RegistrationComponent,
    LoginComponent,
    GameSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
