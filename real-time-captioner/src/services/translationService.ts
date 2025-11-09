/**
 * Google Cloud Translation API integration
 * Translates text from English to the target language
 */

// Use the dedicated Google Cloud Translation API key
const TRANSLATE_API_KEY = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY || '';

if (!TRANSLATE_API_KEY || TRANSLATE_API_KEY === 'YOUR_GOOGLE_TRANSLATE_API_KEY_HERE') {
  console.warn('Warning: REACT_APP_GOOGLE_TRANSLATE_API_KEY is not set. Translation will not work.');
  console.warn('Please get your API key from: https://console.cloud.google.com/apis/credentials');
} else {
  console.log('✅ Google Cloud Translation API key loaded');
}

export interface TranslationResult {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

/**
 * Translate text using Google Cloud Translation API
 * @param text - The text to translate
 * @param targetLanguage - Target language code (e.g., 'es', 'fr', 'de')
 * @param sourceLanguage - Source language code (default: 'en')
 * @returns Translated text
 */
export async function translateText(
  text: string,
  targetLanguage: string,
  sourceLanguage: string = 'en'
): Promise<string> {
  // If target language is English or same as source, return original text
  if (targetLanguage === 'en' || targetLanguage === sourceLanguage) {
    return text;
  }

  if (!TRANSLATE_API_KEY) {
    console.error('Google Translate API key not configured');
    return text; // Return original text if no API key
  }

  try {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${TRANSLATE_API_KEY}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: sourceLanguage,
        target: targetLanguage,
        format: 'text'
      })
    });

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.data && data.data.translations && data.data.translations[0]) {
      return data.data.translations[0].translatedText;
    }

    throw new Error('Invalid translation response');
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text on error
  }
}

/**
 * Translate an array of texts (batch translation)
 * @param texts - Array of texts to translate
 * @param targetLanguage - Target language code
 * @param sourceLanguage - Source language code (default: 'en')
 * @returns Array of translated texts
 */
export async function translateBatch(
  texts: string[],
  targetLanguage: string,
  sourceLanguage: string = 'en'
): Promise<string[]> {
  if (targetLanguage === 'en' || targetLanguage === sourceLanguage) {
    return texts;
  }

  if (!TRANSLATE_API_KEY) {
    console.error('Google Translate API key not configured');
    return texts;
  }

  try {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${TRANSLATE_API_KEY}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: texts,
        source: sourceLanguage,
        target: targetLanguage,
        format: 'text'
      })
    });

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.data && data.data.translations) {
      return data.data.translations.map((t: any) => t.translatedText);
    }

    throw new Error('Invalid translation response');
  } catch (error) {
    console.error('Batch translation error:', error);
    return texts;
  }
}
