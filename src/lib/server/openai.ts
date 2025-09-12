import OpenAI from "openai";
import { PRIVATE_OPENAI_API_KEY } from "$env/static/private";

export const openai = new OpenAI({ apiKey: PRIVATE_OPENAI_API_KEY });
