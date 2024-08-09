import React, { useContext } from "react";
import { Box } from "@mui/material";
import { LangContext, LangOptions } from "../context/LangProvider";
import Key, { KeyVariants } from "./Key";

const Keyboard = () => {
    const { lang } = useContext(LangContext);
    
    const keynameOpt = {
        [LangOptions.english]: 'Submit',
        [LangOptions.russian]: 'Готово',
    };

    const keys: string[][] = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ''],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M', keynameOpt[lang]],
    ];

    return (
        <Box sx={{
            display: 'flex', gap: '12px', width: 'fit-content',
            flexDirection: 'column', justifyContent: 'flex-end',
            border: '1px solid var(--border-color)', borderRadius: '12px',
            p: '25px', height: 'fit-content'
        }}>
            {keys.map(row =>
                <Box key={row.join('')} sx={{ display: 'flex', gap: '12px' }}>
                    {row.map(letter =>
                        <Key
                            key={letter}
                            value={letter}
                            variant={
                                letter === '' ? KeyVariants.erase :
                                ['Submit', 'Готово'].includes(letter) ? KeyVariants.submit : KeyVariants.alphabetic
                            }
                        />
                    )}
                </Box>
            )}
        </Box>
    );
}

export default Keyboard;