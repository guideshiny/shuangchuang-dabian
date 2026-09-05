export type TrainingMode = 'standard' | 'elevator' | 'followup' | 'weakness' | 'adversarial';

export interface Project {
  id: string;
  name: string;
  track: string;
  summary: string;
  tags: string[];
}

export interface ModeDef {
  id: TrainingMode;
  name: string;
  icon: any; // We'll pass the lucide component
  description: string;
  color: string;
  bg: string;
  border: string;
  text: string;
  tags: string[];
}

export interface Message {
  id: string;
  role: 'judge' | 'user';
  content: string;
  time?: number; // seconds
}

export interface DimensionScore {
  name: string;
  score: number;
  color: string;
}
