import OpenAI from 'openai';
import { PUBLIC_OPENAI_API_KEY } from '$env/static/public';

const openai = new OpenAI({ apiKey: PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true});

const formPrompt = (phrase:string, lang1:string, lang2:string, contexts:string, regions:string) => {
    // Provide casual translations of 'Hello' from English to Spanish used in Cuba. Include phonetic spelling, description, and part of speech. Return the results in JSON format.
    return (`Provide all ${contexts} translations of "${phrase}" from ${lang1} to ${lang2} used in ${regions}. Return the results in JSON format with the properties of translation, part_of_speech, definition, region (set to ${regions}), context (set to ${contexts}), original_language (set to ${lang1}), translate_language (set to ${lang2}), and phonetic_spelling. Provide examples for each translation, showcasing a sentence in both ${lang1} and ${lang2} under 'examples' with '${lang1}' and '${lang2}' properties.`);

    // Provide all casual translations of 'hello' from English to Mexican Spanish in JSON format. Include properties for 'translation', 'part_of_speech', 'description', 'region' (set to 'Mexico'), 'context' (set to 'casual'), and 'phonetic_spelling'. Provide examples for each translation, showcasing a sentence in both Spanish and English under 'examples' with 'spanish' and 'english' properties.
};

export const translatePhrase = async(phrase:string, origin:string, translateLang:string, contexts:string, regions:string) => {
    const prompt = formPrompt(phrase, origin, translateLang, contexts, regions);

    const textResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
        temperature: 0.6
    });

    return{
        response: textResponse.choices[0].message.content
    };
}

export const textToSpeech = async(phrase:string) => {
    const response = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: phrase
    });

    const audioStream = await response.blob();
    return URL.createObjectURL(audioStream);
}

type Uploadable = string | Blob;

export const speechToText = async (audioSrc: Blob) => {
    const audioFile = new File([audioSrc], 'audio.mp3', { type: 'audio/mp3', lastModified: Date.now() });

    const transcript = await openai.audio.transcriptions.create({
        model: "whisper-1",
        file: audioFile
    })
    
    return(transcript.text);
}
