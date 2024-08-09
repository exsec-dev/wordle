import React, { useContext } from "react";
import { LangContext } from "../context/LangProvider";
import { Button } from "@mui/material";
import { TranslateRounded } from '@mui/icons-material';

const LanguageButton = () => {
    const { switchLang } = useContext(LangContext);

    return (
        <Button
            sx={{
                p: '5px',
                minWidth: '32px', height: '32px',
                bgcolor: 'var(--cell-color)',
                color: '#ffffff6b',
                border: '1px solid var(--cell-border-color)',
                borderRadius: '5px',
                '&:hover': { bgcolor: 'rgb(27 27 27)' }
            }}
            onClick={switchLang}
        >
            <TranslateRounded sx={{ fontSize: '1.25rem' }}/>
        </Button>
    );
}

export default LanguageButton;