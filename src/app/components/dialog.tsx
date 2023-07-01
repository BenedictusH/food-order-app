import React, { Children, ReactElement } from 'react';

import { Button, IconButton, Typography, Dialog as BaseDialog, DialogProps } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { title } from 'process';

interface ComponentProps extends DialogProps {
    onCloseClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
    title?: string,
    renderItems: React.ReactElement
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function FullScreenDialog({ onCloseClick, title, renderItems, ...props }: ComponentProps) {

    return (
        <BaseDialog
            {...props}
            fullScreen
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="close"
                        onClick={onCloseClick}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <>
                {renderItems}
            </>
        </BaseDialog>
    );
}