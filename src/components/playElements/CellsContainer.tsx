import React, { useEffect } from "react";
import useCells from "../utils/useCells";
import { Box, LinearProgress, linearProgressClasses } from "@mui/material";
import Cell from "./Cell";

const WIDTH: number = 5;
const HEIGHT: number = 6;

const CellsContainer = () => {
    const {
        cells, results,
        addNewCell, clearCell, submitWord,
        isError, isLoading, isCorrect
    } = useCells({ w: WIDTH, h: HEIGHT });

    const handleKeyDown = (event: KeyboardEvent) => {
        if (!isCorrect) {
            if (event.key.length === 1 && event.key.match(/[a-zA-Z]/)) {
                addNewCell(event.key);
            } else if (event.key === 'Enter') {
                submitWord();
            } else if (event.key === 'Backspace' || event.key === 'Delete') {
                clearCell();
            }
        }
    }

    useEffect(() => {
        document.removeEventListener('keydown', handleKeyDown);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCorrect]);

    return (<Box display='flex' gap='32px'>
        <LinearProgress
            variant={isLoading ? 'indeterminate' : 'determinate'}
            value={0}
            sx={{
                width: '2px', height: '440px',
                transition: 'background-color ease-in-out .5s',
                bgcolor: isError ? 'var(--error-color)' :
                    isCorrect ? 'var(--green-color)' : 'var(--cell-border-color)',
                [`& .${linearProgressClasses.bar1Determinate}`]: {
                    bgcolor: 'var(--thumb-color)'
                },
                [`& .${linearProgressClasses.bar1Indeterminate}`]: {
                    animation: 'progress1 2.1s cubic-bezier(0.7, 0.8, 0.7, 0.4) infinite',
                    bottom: 'unset',
                    right: '0',
                    bgcolor: 'var(--thumb-color)'
                },
                [`& .${linearProgressClasses.bar2Indeterminate}`]: {
                    animation: 'progress2 2.1s cubic-bezier(0.7, 0.8, 0.7, 0.4) infinite',
                    bottom: 'unset',
                    right: '0',
                    bgcolor: 'var(--thumb-color)'
                },
            }}
        />
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        }}>
            {cells.map((arr, i) => {
                return (
                    <Box key={i} sx={{
                        display: 'flex',
                        gap: '10px'
                    }}>
                        {arr.map((cell, j) => 
                            <Cell
                                key={`${i}_${j}`}
                                value={cell}
                                isCorrect={
                                    (isCorrect && results.length - 1 === i)
                                    || (results?.[i]?.character_info?.[j]?.scoring?.correct_idx ?? false)
                                }
                                isInWord={results?.[i]?.character_info?.[j]?.scoring?.in_word ?? false}
                            />
                        )}
                    </Box>
                );
            })}
        </Box>
    </Box>);
}

export default CellsContainer;