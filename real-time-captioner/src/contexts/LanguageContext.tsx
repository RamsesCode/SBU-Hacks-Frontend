import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.notes': 'Notes',
    'nav.logout': 'Logout',
    
    // Landing Page
    'landing.title': 'Real-Time Captioner',
    'landing.subtitle': 'Capture and transcribe lectures in real-time',
    'landing.login': 'Login',
    'landing.signup': 'Sign Up',
    
    // Home Page
    'home.listening': 'Listening...',
    'home.notListening': 'Click microphone to start',
    'home.clear': 'Clear',
    'home.save': 'Save Session',
    'home.saveTooltip': 'Save your recording to notes',
    
    // Subject Prompt
    'subject.title': 'What subject is this session about?',
    'subject.subtitle': 'This helps organize your notes (or skip for AI to detect)',
    'subject.skip': 'Skip (AI will detect)',
    'subject.computerScience': 'Computer Science',
    'subject.mathematics': 'Mathematics',
    'subject.physics': 'Physics',
    'subject.chemistry': 'Chemistry',
    'subject.biology': 'Biology',
    'subject.history': 'History',
    'subject.english': 'English',
    'subject.other': 'Other',
    
    // Notes Page
    'notes.title': 'My Lecture Notes',
    'notes.noSessions': 'No saved sessions yet',
    'notes.duration': 'Duration',
    'notes.minutes': 'min',
    'notes.summary': 'Summary',
    'notes.keyPoints': 'Key Points',
    'notes.topics': 'Topics',
    'notes.transcript': 'Full Transcript',
    'notes.processing': 'Processing...',
    'notes.delete': 'Delete',
    
    // Captions
    'captions.original': 'English',
    'captions.translation': 'Translation',
    
    // Language Selector
    'language.button': 'Language',
    'language.english': 'English',
    'language.spanish': 'Spanish',
    
    // Chatbot
    'chatbot.title': 'Study Assistant',
    'chatbot.placeholder': 'Ask me about your lectures...',
    'chatbot.greeting': "Hi! I'm your study assistant. I can help you with your lecture notes, assignments, and answer questions about what your professor said. What would you like to know?",
    'chatbot.suggestions.assignments': 'What assignments did my professor mention?',
    'chatbot.suggestions.summary': "Summarize yesterday's lecture",
    'chatbot.suggestions.topics': 'What topics have I covered this week?',
    'chatbot.suggestions.review': 'Help me review for the exam',
    'chatbot.tryAsking': 'Try asking:',
  },
  es: {
    // Navbar
    'nav.home': 'Inicio',
    'nav.notes': 'Notas',
    'nav.logout': 'Cerrar Sesión',
    
    // Landing Page
    'landing.title': 'Subtítulos en Tiempo Real',
    'landing.subtitle': 'Captura y transcribe conferencias en tiempo real',
    'landing.login': 'Iniciar Sesión',
    'landing.signup': 'Registrarse',
    
    // Home Page
    'home.listening': 'Escuchando...',
    'home.notListening': 'Haz clic en el micrófono para comenzar',
    'home.clear': 'Borrar',
    'home.save': 'Guardar Sesión',
    'home.saveTooltip': 'Guarda tu grabación en notas',
    
    // Subject Prompt
    'subject.title': '¿Sobre qué tema es esta sesión?',
    'subject.subtitle': 'Esto ayuda a organizar tus notas (o salta para que la IA lo detecte)',
    'subject.skip': 'Saltar (la IA lo detectará)',
    'subject.computerScience': 'Ciencias de la Computación',
    'subject.mathematics': 'Matemáticas',
    'subject.physics': 'Física',
    'subject.chemistry': 'Química',
    'subject.biology': 'Biología',
    'subject.history': 'Historia',
    'subject.english': 'Inglés',
    'subject.other': 'Otro',
    
    // Notes Page
    'notes.title': 'Mis Notas de Clase',
    'notes.noSessions': 'No hay sesiones guardadas aún',
    'notes.duration': 'Duración',
    'notes.minutes': 'min',
    'notes.summary': 'Resumen',
    'notes.keyPoints': 'Puntos Clave',
    'notes.topics': 'Temas',
    'notes.transcript': 'Transcripción Completa',
    'notes.processing': 'Procesando...',
    'notes.delete': 'Eliminar',
    
    // Captions
    'captions.original': 'Inglés',
    'captions.translation': 'Traducción',
    
    // Language Selector
    'language.button': 'Idioma',
    'language.english': 'Inglés',
    'language.spanish': 'Español',
    
    // Chatbot
    'chatbot.title': 'Asistente de Estudio',
    'chatbot.placeholder': 'Pregúntame sobre tus clases...',
    'chatbot.greeting': '¡Hola! Soy tu asistente de estudio. Puedo ayudarte con tus notas de clase, tareas y responder preguntas sobre lo que dijo tu profesor. ¿Qué te gustaría saber?',
    'chatbot.suggestions.assignments': '¿Qué tareas mencionó mi profesor?',
    'chatbot.suggestions.summary': 'Resume la clase de ayer',
    'chatbot.suggestions.topics': '¿Qué temas he cubierto esta semana?',
    'chatbot.suggestions.review': 'Ayúdame a repasar para el examen',
    'chatbot.tryAsking': 'Intenta preguntar:',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('preferredLanguage') as Language;
    if (saved && (saved === 'en' || saved === 'es')) {
      setLanguage(saved);
    }
  }, []);

  // Save language to localStorage when it changes
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
