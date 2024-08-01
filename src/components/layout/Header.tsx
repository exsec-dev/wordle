import React from "react";
import { Box, Typography } from "@mui/material";
import InfoPanel, { InfoPanelVariants } from "../blocks/InfoPanel";
import WordleIcon from "../../icons/WordleIcon";

const Header = () => {
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
                        text='Made by @exsecantb'
                        variant={InfoPanelVariants.green}
                        href="https://github.com/exsecantb/wordle"
                        withIcon
                    />
                    <InfoPanel
                        text='Based on @petergeorgas API'
                        variant={InfoPanelVariants.yellow}
                        href="https://github.com/petergeorgas/Wordle-API"
                        withIcon
                    />
                </Box>
            </Box>
        </header>
    );
}

export default Header;