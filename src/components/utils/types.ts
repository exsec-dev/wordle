interface ICharacterInfo {
    char: string;
    scoring: {
        correct_idx: boolean;
        in_word: boolean;
    }
}

export interface IResults {
    character_info: ICharacterInfo[];
    guess: string;
    was_correct: boolean;
}