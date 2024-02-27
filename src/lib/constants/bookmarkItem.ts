interface BookmarkItem {
    originLanguage: string;
    translateLanguage: string;
    phrase: string;
    region: string;
    context: string;
    partSpeech: string;
    phoneticSpelling: string;
    examples: any[];
    description: string;
}

export default BookmarkItem;