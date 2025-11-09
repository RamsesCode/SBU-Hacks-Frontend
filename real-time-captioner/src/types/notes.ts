export interface CaptureSession {
  id: string;
  subject: string;
  timestamp: Date;
  duration: number; // in minutes
  captions: string[];
  rawText: string;
  isProcessed: boolean;
  summary?: string;
}

export type SubjectFilter = 'All' | 'Computer Science' | 'Mathematics' | 'Physics' | 'Biology' | 'History';

export interface NotesState {
  sessions: CaptureSession[];
  selectedSubject: SubjectFilter;
  searchQuery: string;
}
