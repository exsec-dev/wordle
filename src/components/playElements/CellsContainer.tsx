import React, { useEffect, useContext } from "react";
import { LangContext, LangOptions } from "../context/LangProvider";
import useCells from "../utils/useCells";
import { Box, LinearProgress, linearProgressClasses, Typography } from "@mui/material";
import { isAndroid } from "../utils/Requests";
import Cell from "./Cell";

const WIDTH: number = 5;
const HEIGHT: number = 6;

const CellsContainer = () => {
    const {
        cells, results,
        addNewCell, clearCell, submitWord,
        isError, isLoading, isCorrect
    } = useCells({ w: WIDTH, h: HEIGHT });
    const { lang } = useContext(LangContext);

    const handleKeyDown = (key: string) => {
        if (!isCorrect) {
            const input = document.getElementById("hiddenInput");
            window.innerWidth < 768 && input?.scrollIntoView({ behavior: "smooth", block: "start" });
            if (key.length === 1 && key.match(/[a-zA-Z]/)) {
                addNewCell(key);
            } else if (key === 'Enter') {
                submitWord();
            } else if (key === 'Backspace' || key === 'Delete') {
                clearCell();
            }
        }
    };

    useEffect(() => {
        const handleEventKey = (e: KeyboardEvent) => {
            if (e.key !== "Unidentified") {
                handleKeyDown(e.key);
            }
        };
        const handleInputChange = (e: Event) => {
            const target = e.target as HTMLInputElement;
            if (target.value) {
                handleKeyDown(target.value);
                target.value = "";
            }
        };

        const input = document.getElementById("hiddenInput") as HTMLInputElement;
        document.removeEventListener('keydown', handleEventKey);
        document.addEventListener('keydown', handleEventKey);

        if (input && isAndroid()) {
            input.addEventListener("input", handleInputChange);
        }

        return () => {
            if (input) {
                input.removeEventListener("input", handleInputChange);
            }
            document.removeEventListener('keydown', handleEventKey);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCorrect]);

    return (<Box display='flex' alignItems="center">
        <Typography
            sx={{
                transform: "rotate(-90deg)",
                height: "100%",
                fontSize: "14px",
                letterSpacing: "0.06rem",
                width: "24px",
                fontWeight: 550,
                transition: 'color ease-in-out .5s',
                color: isError ? 'var(--error-color)' :
                    isCorrect ? 'var(--green-color)' : 'var(--thumb-color)',
            }}
        >
            {lang === LangOptions.english ? "status" : "статус"}
        </Typography>
        <LinearProgress
            id="progress-bar"
            variant={isLoading ? 'indeterminate' : 'determinate'}
            value={0}
            sx={{
                width: '2px',
                transition: 'background-color ease-in-out .5s',
                mr: '32px',
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
        <Box id="play-field" sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            mr: '32px',
        }}>
            <input
                id="hiddenInput"
                inputMode="text"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                enterKeyHint="send" 
                style={{
                    position: "absolute",
                    opacity: 0,
                    width: "1px",
                    height: "1px",
                    border: "none"
                }}
            />
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