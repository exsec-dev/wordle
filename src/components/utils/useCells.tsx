import { useState, useRef } from "react";
import { useMutation } from "react-query";
import Requests from "./Requests";
import { IResults } from "./types";

interface ICells {
    w: number;
    h: number;
}

interface ICurrentCell {
    row: number;
    col: number;
}

function useCells({ w, h }: ICells) {
    const [cells, setCells] = useState<string[][]>([...Array(h)].map(_ => Array(w).fill('')));
    const [results, setResults] = useState<IResults[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const targetCell = useRef<ICurrentCell>({ row: 0, col: 0 });

    const addNewCell = (value: string): void => {
        setIsError(false);
        if (targetCell.current.col < w && !cells[targetCell.current.row][targetCell.current.col]) {
            const newArr = [...cells];
            newArr[targetCell.current.row][targetCell.current.col] = value;
            setCells(newArr);
            if (targetCell.current.col + 1 < w) {
                targetCell.current = { row: targetCell.current.row, col: targetCell.current.col + 1 };
            }
        }
    }

    const clearCell = (): void => {
        setIsError(false);
        if (targetCell.current.col > 0) {
            const newArr = [...cells];
            if (targetCell.current.col + 1 === w && !!cells[targetCell.current.row][targetCell.current.col]) {
                newArr[targetCell.current.row][targetCell.current.col] = '';
            } else {
                newArr[targetCell.current.row][targetCell.current.col - 1] = '';
                targetCell.current = { row: targetCell.current.row, col: targetCell.current.col - 1 };
            }
            setCells(newArr);
        }
    }

    const checkWord = useMutation(Requests.checkWord, {
        onSuccess: (data) => {
            setIsLoading(false);
            setResults([...results, data?.data]);
            if (targetCell.current.row + 1 < h) {
                targetCell.current = { row: targetCell.current.row + 1, col: 0 };
            }
        },
        onError: (error) => {
            setIsLoading(false);
            setIsError(true);
            console.error(error);
        }
    });

    const submitWord = async () => {
        if (cells[targetCell.current.row].filter(el => !!el).length === w) {
            setIsLoading(true);
            await checkWord.mutateAsync(cells[targetCell.current.row].join(''));
        } else {
            setIsError(true);
        }
    }

    return {
        cells,
        isLoading, isError, isCorrect: results?.[results.length - 1]?.was_correct,
        addNewCell, clearCell,
        submitWord, results,
    };
}

export default useCells;