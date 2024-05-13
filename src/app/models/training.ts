export interface Training {
  id?: number;
  name: string;
  exercises: string[];
  durata: number;
  level: string;
  target: number;
  imageUrl?:string;
}
