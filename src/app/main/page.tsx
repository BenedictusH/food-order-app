'use client'
import * as React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Grid, Typography, Button, IconButton } from '@mui/material'
import { styled } from '@mui/system';

import Card from '../components/card';

import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function FullScreenDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open full-screen dialog
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Sound
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem button>
                        <ListItemText primary="Phone ringtone" secondary="Titania" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText
                            primary="Default notification ringtone"
                            secondary="Tethys"
                        />
                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
}

const DUMMYDATA = [{
    "id": 1,
    "name": "Oil - Olive",
    "price": 73
}, {
    "id": 2,
    "name": "Beef - Flank Steak",
    "price": 16
}, {
    "id": 3,
    "name": "Yogurt - Blueberry, 175 Gr",
    "price": 22
}, {
    "id": 4,
    "name": "Oil - Olive Bertolli",
    "price": 8
}, {
    "id": 5,
    "name": "Tomatillo",
    "price": 67
}, {
    "id": 6,
    "name": "Pasta - Ravioli",
    "price": 32
}, {
    "id": 7,
    "name": "Parsley - Fresh",
    "price": 56
}, {
    "id": 8,
    "name": "Flour - Masa De Harina Mexican",
    "price": 57
}, {
    "id": 9,
    "name": "Food Colouring - Green",
    "price": 26
}, {
    "id": 10,
    "name": "Sprouts - Onion",
    "price": 55
}]



const FixedBackground = styled('div')(({ theme }) => ({
    height: 400,
    width: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `url('https://picsum.photos/id/225/1280/901')`,
    backgroundAttachment: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}))


export default function Demo() {
    const router = useRouter()

    const handleClick = (id: number) => {
        console.log(id)
    }

    return (
        <main style={{ height: '200vh' }}>
            <FixedBackground>
                <Typography variant='h3' className='font-bold backdrop-brightness-50 backdrop-blur-md text-white h-full w-full flex justify-center items-center'>
                    Order Now
                </Typography>
            </FixedBackground>
            <Grid
                container direction='column' justifyContent='center' alignItems='center' rowSpacing={2}
                className='p-8 md:px-24 min-h-screen m-0'>
                {DUMMYDATA.map((item) => <Grid item key={item.id}>
                    <Card key={item.id} name={item.name} price={item.price} onButtonClick={() => handleClick(item.id)}></Card>
                </Grid>)}
            </Grid>
            <FullScreenDialog></FullScreenDialog>
        </main >
    )
}