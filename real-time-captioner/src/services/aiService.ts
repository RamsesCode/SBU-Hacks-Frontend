import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || '';

if (!API_KEY) {
  console.warn('Warning: REACT_APP_GEMINI_API_KEY is not set. AI summarization will not work.');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export interface AISummary {
  summary: string;
  keyPoints: string[];
  suggestedSubject: string;
  topics: string[];
}

/**
 * Generates an AI-powered summary of captured session text
 * @param rawText - The full transcript from the listening session
 * @param duration - Duration of the session in minutes
 * @returns AI-generated summary with key points and subject classification
 */
export async function generateSessionSummary(
  rawText: string,
  duration: number
): Promise<AISummary> {
  if (!API_KEY) {
    throw new Error('Google AI API key is not configured. Please add REACT_APP_GEMINI_API_KEY to your .env file.');
  }

  try {
    // Use gemini-2.5-flash (stable model released June 2025)
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      }
    });

    const prompt = `You are an AI study assistant helping students organize their lecture notes. Analyze the following transcript from a ${duration}-minute session and provide:

1. A concise 2-3 sentence summary suitable for quick review
2. 5-7 key bullet points highlighting the most important concepts
3. The most likely academic subject (choose from: Computer Science, Mathematics, Physics, Chemistry, Biology, History, English, Psychology, Economics, Engineering, or Other)
4. 3-5 main topics covered

Transcript:
"""
${rawText}
"""

Respond in JSON format:
{
  "summary": "your summary here",
  "keyPoints": ["point 1", "point 2", ...],
  "suggestedSubject": "subject name",
  "topics": ["topic 1", "topic 2", ...]
}`;

    console.log('🤖 Sending request to Gemini API...');
    console.log('📝 Prompt length:', prompt.length);
    console.log('📝 Raw text length:', rawText.length);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Received response from Gemini API');
    console.log('📄 Response text length:', text.length);
    console.log('📄 Response preview:', text.substring(0, 200));
    
    // Extract JSON from the response (handle markdown code blocks if present)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('❌ No JSON found in response:', text);
      throw new Error('Failed to parse AI response - no JSON found');
    }
    
    console.log('🔍 Extracted JSON:', jsonMatch[0].substring(0, 200));
    
    const parsed = JSON.parse(jsonMatch[0]) as AISummary;
    
    // Validate the response structure
    if (!parsed.summary || !parsed.keyPoints || !parsed.suggestedSubject || !parsed.topics) {
      console.error('❌ Invalid response structure:', parsed);
      throw new Error('Invalid AI response structure');
    }
    
    console.log('✅ Successfully parsed AI response');
    console.log('📊 Summary length:', parsed.summary.length);
    console.log('📊 Key points count:', parsed.keyPoints.length);
    console.log('📊 Topics count:', parsed.topics.length);
    
    return parsed;
  } catch (error) {
    console.error('❌ Error in generateSessionSummary:', error);
    throw new Error(`Failed to generate summary: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Generate a study guide from a session
 * @param rawText - The full transcript from the listening session
 * @param subject - The subject of the session
 * @returns Study questions and review materials
 */
export async function generateStudyGuide(
  rawText: string,
  subject: string
): Promise<{ questions: string[]; reviewPoints: string[] }> {
  if (!API_KEY) {
    throw new Error('Google AI API key is not configured.');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Based on this ${subject} lecture transcript, generate:
1. 5 important review questions that test understanding of the material
2. 5 key points students should review before an exam

Transcript:
"""
${rawText}
"""

Respond in JSON format:
{
  "questions": ["question 1", "question 2", ...],
  "reviewPoints": ["point 1", "point 2", ...]
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Error generating study guide:', error);
    throw error;
  }
}

/**
 * Chat with AI assistant about lecture notes
 * @param userMessage - The user's question or message
 * @param sessions - All saved lecture sessions for context
 * @returns AI assistant's response
 */
export async function chatWithAI(
  userMessage: string,
  sessions: any[]
): Promise<string> {
  if (!API_KEY) {
    throw new Error('Google AI API key is not configured.');
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 1024,
      }
    });

    // Build context from sessions
    const lectureContext = sessions.map(session => {
      const date = new Date(session.timestamp).toLocaleDateString();
      return `
**Lecture: ${session.subject} (${date})**
Duration: ${session.duration} minutes
${session.aiSummary ? `Summary: ${session.aiSummary}` : ''}
${session.keyPoints ? `Key Points: ${session.keyPoints.join(', ')}` : ''}
${session.topics ? `Topics: ${session.topics.join(', ')}` : ''}
Transcript: ${session.rawText?.substring(0, 500)}...
---`;
    }).join('\n');

    const prompt = `You are a helpful study assistant for a student. You have access to their lecture notes and recordings.

Available Lecture Notes:
${lectureContext || 'No lecture notes saved yet.'}

Student Question: ${userMessage}

Provide a helpful, conversational response. If the student asks about assignments, deadlines, or specific topics mentioned in lectures, reference the lecture notes above. If they ask about something not in the notes, politely let them know and offer to help with what you do know.

Keep responses concise (2-3 paragraphs max) and friendly.`;

    console.log('🤖 Sending chat request to Gemini...');
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Chat response received');
    
    return text;
  } catch (error) {
    console.error('❌ Error in chat:', error);
    throw new Error(`Failed to get response: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
