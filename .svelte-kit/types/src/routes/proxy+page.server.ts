// @ts-nocheck
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import type { Actions } from './$types';

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });

export const actions = {
    submit: async ({ request } : any) => {
        const promptFormData = await request.formData();
        const phrase = promptFormData.get('phrase') as string;
        const origin = promptFormData.get('origin') as string;
        const translateLang = promptFormData.get('translate') as string;
        const contexts = promptFormData.get('origin') as string;
        const regions = promptFormData.get('regions') as string;

        console.log("this is the prompt:");
        console.log(regions);

        const prompt = `Please give all ${contexts} translations of "${phrase}" from ${origin} to ${translateLang} that are used in ${regions}. Deliver the result in a JSON format and include phonetic spelling, description, and part of speech.`;

        console.log(prompt);
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