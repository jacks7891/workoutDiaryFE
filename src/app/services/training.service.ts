import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Training } from '../models/training';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(`${this.apiUrl}/trainings/all`)
  }

  public getTrainingById(id: number): Observable<Training[]> {
    return this.http.get<Training[]>(`${this.apiUrl}/trainings/find/${id}`)
  }

  public postTraining(training: Training): Observable<Training> {
    return this.http.post<Training>(`${this.apiUrl}/trainings/add`, training);
  }

  public updateTraining(training: Training): Observable<Training> {
    return this.http.put<Training>(`${this.apiUrl}/trainings/update`, training);
  }

  public deleteTraining(trainingId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/trainings/delete/${trainingId}`);
  }
}
