import React, { useContext } from "react";
import { LangContext, LangOptions } from "../context/LangProvider";
import { Box, Typography } from "@mui/material";
import CellsContainer from "../playElements/CellsContainer";
import Keyboard from "../playElements/Keyboard";

const titleOpt = {
    [LangOptions.english]: 'About',
    [LangOptions.russian]: 'Об игре',
}

const descriptionOpt = {
    [LangOptions.english]:
        `Wordle is a daily word puzzle where you have six tries to guess a five-letter word.
        After each guess, the game tells you which letters are in the word and in the correct position.
        Green means you got the letter right and in the right spot,
        yellow means it's in the word but not in the right spot,
        and grey means it's not in the word at all.
        It's a fun and addictive way to test your vocabulary and challenge your brain!`,
    [LangOptions.russian]:
        `Wordle — это ежедневная головоломка с буквами, где у вас есть шесть попыток угадать слово из 5 букв.
        После каждой попытки игра подсказывает, какие буквы есть в слове и в правильном ли они положении. 
        Зелёный цвет означает, что вы угадали букву и её положение. Жёлтый цвет означает, что буква есть в слове,
        но стоит в неправильном месте. Серый цвет означает, что буквы нет в слове вообще.
        Это забавный и затягивающий способ проверить свой словарный запас и бросить вызов своему мозгу!`,
}

const PlayField = () => {
    const { lang } = useContext(LangContext);

    return (
        <Box className="field">
            <CellsContainer />
            <Box ml='100px' display='flex' flexDirection='column' height='440px' justifyContent='space-between'>
                <Box display='flex' flexDirection='column' gap='4px' color='#ffffffe8'>
                    <Typography fontSize='26px' fontWeight={600}>{titleOpt[lang]}</Typography>
                    <Typography fontSize='15px' letterSpacing='0.03rem' fontWeight={300}>
                        {descriptionOpt[lang]}
                    </Typography>
                </Box>
                <Keyboard />
            </Box>
        </Box>
    );
}

export default PlayField;