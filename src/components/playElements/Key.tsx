import React, { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { Backspace } from '@mui/icons-material';

export enum KeyVariants {
    alphabetic = 'ALPHABETIC',
    submit = 'SUBMIT',
    erase = 'ERASE'
}

interface IKey {
    value: string;
    variant?: KeyVariants;
}

const Key = ({ value, variant = KeyVariants.alphabetic }: IKey) => {
    const [isKeyDown, setIsKeyDown] = useState<boolean>(false);

    const keyValues = {
        [KeyVariants.alphabetic]: {
            value: value.toLocaleLowerCase(),
            style: {
                width: '55px',
                bgcolor: 'var(--cell-color)',
            },
            hover: { bgcolor: 'rgb(27 27 27)' },
            displayed: (
                <Typography sx={{ fontSize: '24px', }}>
                    {value}
                </Typography>
            ),
        },
        [KeyVariants.submit]: {
            value: 'Enter',
            style: {
                width: '189px',
                bgcolor: 'var(--green-color)',
            },
            hover: { bgcolor: '#69b962' },
            typographyStyle: {
                fontSize: '18px',
                letterSpacing: '0.03rem',
                fontWeight: '650'
            },
            displayed: (
                <Typography sx={{
                    fontSize: '18px',
                    letterSpacing: '0.03rem',
                    fontWeight: '650'
                }}>
                    {value}
                </Typography>
            ),
        },
        [KeyVariants.erase]: {
            value: 'Backspace',
            style: {
                width: '55px',
                bgcolor: 'var(--yellow-color)',
            },
            hover: { bgcolor: '#e4c03b' },
            displayed: (
                <Backspace />
            ),
        },
    };

    // Triggers keyboard event
    const handleManualKeyDown = (): void => {
        const event = new KeyboardEvent('keydown', {
            key: keyValues[variant].value,
        });
        document.dispatchEvent(event);
    }

    // Animate keys when typing
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === keyValues[variant].value && event.isTrusted) {
            setIsKeyDown(true);
        }
    }
    const handleKeyUp = (event: KeyboardEvent) => {
        if (event.key === keyValues[variant].value && event.isTrusted) {
            setIsKeyDown(false);
        }
    }

    // Disable animation
    const handleMouseUp = () => {
        !isKeyDown && setIsKeyDown(false);
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
            document.removeEventListener('mouseup', handleMouseUp);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Button
            sx={{
                ...keyValues[variant].style,
                height: '55px', minWidth: 'unset', color: '#ffffffe8',
                borderRadius: '5px', userSelect: 'none', textTransform: 'none',
                position: 'relative', border: '1px solid var(--cell-border-color)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                bottom: isKeyDown ? '0' : '2px', right: isKeyDown ? '0' : '2px',
                transition: 'bottom ease 0.1s, right ease 0.1s',
                '&::before': {
                    content: '""', position: 'absolute',
                    bottom: isKeyDown ? '-2px' : '-4px', right: isKeyDown ? '-2px' : '-4px',
                    bgcolor: 'var(--key-shadow-color)',
                    transition: 'bottom ease 0.1s, right ease 0.1s',
                    width: '100%', height: '55px',
                    zIndex: '-1', borderRadius: '5px',
                },
                '&:hover': keyValues[variant].hover
            }}
            onClick={handleManualKeyDown}
            onMouseDown={() => setIsKeyDown(true)}
        >
            {keyValues[variant].displayed}
        </Button>
    );
}

export default Key;