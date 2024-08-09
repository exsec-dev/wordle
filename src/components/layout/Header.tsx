import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { LangContext, LangOptions } from "../context/LangProvider";
import InfoPanel, { InfoPanelVariants } from "../blocks/InfoPanel";
import LanguageButton from "../blocks/LanguageButton";
import WordleIcon from "../../icons/WordleIcon";

const textOpt = {
    [LangOptions.english]: ['Made by @exsecantb', 'Based on @petergeorgas API'],
    [LangOptions.russian]: ['Автор: @exsecantb', 'Основано на: @petergeorgas API'],
}

const Header = () => {
    const { lang } = useContext(LangContext);

    return (
        <header>
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <WordleIcon sx={{ fontSize: '27px' }}/>
                    <Typography
                        fontSize={27}
                        fontWeight={600}
                        fontFamily='"Josefin Sans", sans-serif'
                        height='34px'
                    >
                        Wordle.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <InfoPanel
                        text={textOpt[lang][0]}
                        variant={InfoPanelVariants.green}
                        href="https://github.com/exsecantb/wordle"
                        withIcon
                    />
                    <InfoPanel
                        text={textOpt[lang][1]}
                        variant={InfoPanelVariants.yellow}
                        href="https://github.com/petergeorgas/Wordle-API"
                        withIcon
                    />
                    <LanguageButton />
                </Box>
            </Box>
        </header>
    );
}

export default Header;