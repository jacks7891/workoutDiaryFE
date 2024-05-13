import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Exercise } from '../models/exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.apiUrl}/exercises/all`)
  }

  public getExerciseById(id: number): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(`${this.apiUrl}/exercises/find/${id}`)
  }

  public postExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(`${this.apiUrl}/exercises/add`, exercise);
  }

  public updateExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.put<Exercise>(`${this.apiUrl}/exercises/update`, exercise);
  }

  public deleteExercise(exerciseId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/exercises/delete/${exerciseId}`);
  }
}
