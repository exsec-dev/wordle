import React from "react";
import { Box, Typography } from "@mui/material";
import { GitHub } from "@mui/icons-material";

export enum InfoPanelVariants {
    yellow = "yellow",
    green = "green"
}

interface IInfoPanel {
    text: string;
    variant: InfoPanelVariants;
    withIcon?: boolean;
    href?: string;
}

const InfoPanel = ({ text, variant = InfoPanelVariants.yellow, withIcon = false, href }: IInfoPanel) => {
    return (
        <Box
            component='a'
            href={href}
            target="blank"
            sx={{
                padding: '5px 11px 5px 13px',
                gap: '6px', cursor: 'pointer',
                minHeight: '32px',
                alignItems: 'center',
                bgcolor: variant === InfoPanelVariants.yellow ? 'var(--y-bg-accent-color)' : 'var(--g-bg-accent-color)',
                borderRadius: '8px',
                color: variant === InfoPanelVariants.yellow ? 'var(--y-text-color)' : 'var(--g-text-color)',
                border: variant === InfoPanelVariants.yellow ? '1px solid #a8a0691a' : '1px solid #7ba3c31a',
                textDecoration: 'none',
                '&:hover': {
                    textDecoration: 'underline',
                }
            }}
        >
            <Typography fontSize={12.5} fontWeight={450} letterSpacing='0.04rem'>
                {text}
            </Typography>
            {withIcon && <GitHub sx={{ fontSize: '15px' }}/>}
        </Box>
    );
}

export default InfoPanel;