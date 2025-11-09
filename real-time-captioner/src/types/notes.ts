export interface CaptureSession {
  id: string;
  subject: string;
  timestamp: Date;
  duration: number; // in minutes
  captions: string[];
  rawText: string;
  isProcessed: boolean;
  summary?: string;
  // AI-generated fields
  aiSummary?: string;
  keyPoints?: string[];
  topics?: string[];
  studyQuestions?: string[];
  reviewPoints?: string[];
  // Translation fields
  translatedCaptions?: string[];
  translatedRawText?: string;
  targetLanguage?: string;
}

export type SubjectFilter = 'All' | 'Computer Science' | 'Mathematics' | 'Physics' | 'Chemistry' | 'Biology' | 'History' | 'English' | 'Psychology' | 'Economics' | 'Engineering' | 'Other' | 'Unclassified';

export interface NotesState {
  sessions: CaptureSession[];
  selectedSubject: SubjectFilter;
  searchQuery: string;
}
