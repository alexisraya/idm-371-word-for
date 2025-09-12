export const translationSchema = {
  type: "object",
  properties: {
    results: {
      type: "array",
      items: {
        type: "object",
        properties: {
          translation: { type: "string" },
          part_of_speech: { type: "string" },
          definition: { type: "string" },
          region: { type: "string" },
          context: { type: "string" },
          original_language: { type: "string" },
          translate_language: { type: "string" },
          phonetic_spelling: { type: "string" },
          examples: {
            type: "object",
            properties: {
              source: { type: "string" },
              target: { type: "string" },
            },
            required: ["source", "target"],
            additionalProperties: false,
          },
        },
        required: [
          "translation",
          "part_of_speech",
          "definition",
          "region",
          "context",
          "original_language",
          "translate_language",
          "phonetic_spelling",
          "examples",
        ],
        additionalProperties: false,
      },
    },
  },
  required: ["results"],
  additionalProperties: false,
} as const;

export type TranslationResult = {
  results: Array<{
    translation: string;
    part_of_speech: string;
    definition: string;
    region: string;
    context: string;
    original_language: string;
    translate_language: string;
    phonetic_spelling: string;
    examples: { source: string; target: string };
  }>;
};
