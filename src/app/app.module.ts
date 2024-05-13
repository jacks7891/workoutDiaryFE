import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { UserComponent } from './components/user/user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateUserModalComponent } from './components/modals/update-user-modal/update-user-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostUserModalComponent } from './components/modals/post-user-modal/post-user-modal.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { TrainingComponent } from './components/training/training.component';
import { PostTrainingModalComponent } from './components/modals/post-training-modal/post-training-modal.component';
import { DiaryComponent } from './components/diary/diary.component';
import { WorkoutComponent } from './components/workout/workout.component';
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomePageComponent,
    NavBarComponent,
    UpdateUserModalComponent,
    PostUserModalComponent,
    ExerciseComponent,
    TrainingComponent,
    PostTrainingModalComponent,
    DiaryComponent,
    WorkoutComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
