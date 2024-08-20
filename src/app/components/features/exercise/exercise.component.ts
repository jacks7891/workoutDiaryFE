import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Exercise } from 'src/app/models/exercise';
import { User } from 'src/app/models/user';
import { ExerciseService } from 'src/app/services/exercise.service';
import { PostUserModalComponent } from '../../modals/post-user-modal/post-user-modal.component';
import { UpdateUserModalComponent } from '../../modals/update-user-modal/update-user-modal.component';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit, OnDestroy{
  public exercises!: Exercise[];
  private subscription = new Subscription();

  constructor(
    private exerciseService: ExerciseService,
    private modalService: NgbModal
  ){}

  ngOnInit(){
    this.getExercises();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public getExercises(): void {
    const sub: Subscription = this.exerciseService.getExercises().subscribe({
      next: (exercises: Exercise[]) => {
        this.exercises = exercises;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    });
    this.subscription.add(sub);
  }

  public createMockExercise() {
    const min = 1;
    const max = 30;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log('mathrandom for image: ',randomNumber)
    let exercise: Exercise = {
      name:'test',
      durata:0,
      serie:0,
      reps:0,
      points:0,
      target:0,
      imageUrl:'https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU/200/300'
    }
    const sub = this.exerciseService.postExercise(exercise).subscribe();
    this.subscription.add(sub);
    window.location.reload();
  }

  public createExercise() {
    const modalRef = this.modalService.open(PostUserModalComponent);
    modalRef.result.then((result) => {
      if (result == "Exercise Created") {
        window.location.reload();
      }
    });
  }

  public findExercise(id: number) {
    const sub = this.exerciseService.getExerciseById(id).subscribe();
    this.subscription.add(sub);
  }

  public updateExercise(exercise: Exercise) {
    const modalRef = this.modalService.open(UpdateUserModalComponent);
    modalRef.componentInstance.userData = exercise;
    modalRef.result.then((result) => {
      if (result == "Exercise Updated") {
        window.location.reload();
      }
    });
  }

  public deleteExercise(id: number): void {
    const sub = this.exerciseService.deleteExercise(id).subscribe();
    this.subscription.add(sub);
    window.location.reload();
  }
}
