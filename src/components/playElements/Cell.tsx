import React from "react";
import { Box, Typography } from "@mui/material";

interface ICell {
    value: string;
    isCorrect?: boolean;
    isInWord?: boolean;
}

const Cell = ({ value, isCorrect = false, isInWord = false }: ICell) => {
    return (
        <Box sx={{
            width: '65px', height: '65px',
            bgcolor: isCorrect ? 'var(--green-color)' : (isInWord ? 'var(--yellow-color)' : 'var(--cell-color)'),
            borderRadius: '5px', pt: '8px',
            userSelect: 'none',
            border: '1px solid var(--cell-border-color)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
            <Typography sx={{ fontFamily: '"Josefin Sans", sans-serif', fontSize: '32px', fontWeight: 700 }}>
                {value.toLocaleUpperCase()}
            </Typography>
        </Box>
    );
}

export default Cell;