import React from "react";
import { Box, Typography } from "@mui/material";
import CellsContainer from "../playElements/CellsContainer";
import Keyboard from "../playElements/Keyboard";

const PlayField = () => {
    return (
        <Box className="field">
            <CellsContainer />
            <Box ml='100px' display='flex' flexDirection='column' height='440px' justifyContent='space-between'>
                <Box display='flex' flexDirection='column' gap='4px' color='#ffffffe8'>
                    <Typography fontSize='28px' fontWeight={600}>Wordle</Typography>
                    <Typography fontSize='15px' letterSpacing='0.03rem' fontWeight={300}>
                        Wordle is a daily word puzzle where you have six tries to guess a five-letter word.
                        After each guess, the game tells you which letters are in the word and in the correct position.
                        Green means you got the letter right and in the right spot,
                        yellow means it's in the word but not in the right spot,
                        and grey means it's not in the word at all.
                        It's a fun and addictive way to test your vocabulary and challenge your brain!
                    </Typography>
                </Box>
                <Keyboard />
            </Box>
        </Box>
    );
}

export default PlayField;