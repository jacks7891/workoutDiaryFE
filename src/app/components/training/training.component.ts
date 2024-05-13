import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Training } from 'src/app/models/training';
import { TrainingService } from 'src/app/services/training.service';
import { PostUserModalComponent } from '../modals/post-user-modal/post-user-modal.component';
import { UpdateUserModalComponent } from '../modals/update-user-modal/update-user-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy{
  public trainings!: Training[];
  private subscription = new Subscription();

  constructor(
    private trainingService: TrainingService,
    private modalService: NgbModal,
    private route: Router,
  ){}

  ngOnInit(){
    this.getTrainings();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public getTrainings(): void {
    const sub: Subscription = this.trainingService.getTrainings().subscribe({
      next: (trainings: Training[]) => {
        this.trainings = trainings;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    });
    this.subscription.add(sub);
  }

  public createMockTraining() {
    const min = 1;
    const max = 30;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log('mathrandom for image: ',randomNumber)
    let training: Training = {
      name:'test',
      exercises:[],
      durata:0,
      level:'',
      target:0,
      imageUrl:''
    }
    const sub = this.trainingService.postTraining(training).subscribe();
    this.subscription.add(sub);
    window.location.reload();
  }

  public createTraining() {
    const modalRef = this.modalService.open(PostUserModalComponent);
    modalRef.result.then((result) => {
      if (result == "Training Created") {
        window.location.reload();
      }
    });
  }

  public findTraining(id: number) {
    //TODO: qua serve per un campo di ricerca
    const sub = this.trainingService.getTrainingById(id).subscribe();
    this.subscription.add(sub);
  }

  public updateTraining(training: Training) {
    const modalRef = this.modalService.open(UpdateUserModalComponent);
    modalRef.componentInstance.userData = training;
    modalRef.result.then((result) => {
      if (result == "Training Updated") {
        window.location.reload();
      }
    });
  }

  public deleteTraining(id: number): void {
    const sub = this.trainingService.deleteTraining(id).subscribe();
    this.subscription.add(sub);
    window.location.reload();
  }

  public startWorkout(id: number): void {
    this.route.navigate(["/workout"]);//devi passare parametro
  }
}
