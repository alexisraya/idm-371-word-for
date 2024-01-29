// @ts-nocheck
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import type { Actions } from './$types';

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });

const formPrompt = (phrase:string, lang1:string, lang2:string, contexts:string, regions:string) => {
    return (`Please give all ${contexts} translations of "${phrase}" from ${lang1} to ${lang2} that are used in ${regions}.Include phonetic spelling, description, and part of speech. Deliver the result in JSON format.`);
};

export const actions = {
    submit: async ({ request } : any) => {
        const promptFormData = await request.formData();
        const phrase = promptFormData.get('phrase') as string;
        const origin = promptFormData.get('origin') as string;
        const translateLang = promptFormData.get('translate') as string;
        const contexts = promptFormData.get('contexts') as string;
        const regions = promptFormData.get('regions') as string;

        const prompt = formPrompt(phrase, origin, translateLang, contexts, regions);

        const textResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: prompt}],
            temperature: 0.7
        });

        return{
            response: textResponse.choices[0].message.content
        };
    }
};;null as any as Actions;