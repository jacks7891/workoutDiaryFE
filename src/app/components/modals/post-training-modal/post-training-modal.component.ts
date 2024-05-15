import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Training } from 'src/app/models/training';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-post-training-modal',
  templateUrl: './post-training-modal.component.html',
  styleUrls: ['./post-training-modal.component.scss']
})
export class PostTrainingModalComponent {
  trainingData!: Training;
  trainingForm!: FormGroup;
  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    public modal: NgbActiveModal,
    private trainingService: TrainingService,) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  initializeForm(): void {
    this.trainingForm = this.fb.group({
      name: ['', Validators.required],
      exercises: [[''], Validators.required],
      durata: [0, Validators.required],
      level: [0],
      target: [0],
      imageUrl: ['']
    });
  }

  onSubmit() {
    if (this.trainingForm.valid) {

      const updatedTrainingData: Training = {
        ...this.trainingData,
        name: this.trainingForm.value.name,
        exercises: this.trainingForm.value.exercises,
        durata: this.trainingForm.value.durata,
        level: this.trainingForm.value.level,
        target: this.trainingForm.value.target,
        imageUrl:this.trainingForm.value.imageUrl
      };

      const sub = this.trainingService.postTraining(updatedTrainingData).subscribe({
        next: () => {
          this.trainingData = updatedTrainingData;
          this.modal.close("training Created");
        },
        error: (e) => {
          alert(e)
        },
      });
      this.subscription.add(sub);
    } else {
      alert("Form is invalid")
    }
  }
}
