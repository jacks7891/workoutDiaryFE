import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/features/home-page/home-page.component';
import { UserComponent } from './components/features/user/user.component';
import { TrainingComponent } from './components/features/training/training.component';
import { ExerciseComponent } from './components/features/exercise/exercise.component';
import { DiaryComponent } from './components/features/diary/diary.component';
import { WorkoutComponent } from './components/features/workout/workout.component';

const routes: Routes =  [
  { path: 'home', component:  HomePageComponent },
  { path: 'users', component: UserComponent },
  { path: 'trainings', component:  TrainingComponent },
  { path: 'exercises', component: ExerciseComponent },
  { path: 'diary', component: DiaryComponent },
  { path: 'workout', component: WorkoutComponent },//devi passare parametro
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
