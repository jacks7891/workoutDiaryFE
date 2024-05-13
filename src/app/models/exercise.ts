export interface Exercise {
  id?: number;
  name: string;
  durata: number;
  serie: number;
  reps: number;
  points: number;
  target: number;
  imageUrl?:string;
}
