import OpenAI from 'openai';
import { PUBLIC_OPENAI_API_KEY } from '$env/static/public';

const openai = new OpenAI({ apiKey: PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true});

const formPrompt = (phrase:string, lang1:string, lang2:string, contexts:string, regions:string) => {
    // Provide casual translations of 'Hello' from English to Spanish used in Cuba. Include phonetic spelling, description, and part of speech. Return the results in JSON format.
    return (`Provide all ${contexts} translations of "${phrase}" from ${lang1} to ${lang2} used in ${regions}. Return the results in JSON format with the properties of translation, part_of_speech, description, and phonetic_spelling.`);
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