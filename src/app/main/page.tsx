'use client'
import * as React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Grid, Typography, List, ListItem, Divider } from '@mui/material'
import { styled } from '@mui/system';

import Card from '../components/card';
import { FullScreenDialog } from '../components/dialog';

import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const DUMMYDATA = [{
    "id": 1,
    "name": "Oil - Olive",
    "price": 73,
    'customization': [
        "Extra Oil", "Extra Sugar", "Extra Ice", 'Less Ice'
    ]
}, {
    "id": 2,
    "name": "Beef - Flank Steak",
    "price": 16,
    'customization': [
        "Less Oil", "Extra Ruch", "Medium", 'Rare'
    ]
}, {
    "id": 3,
    "name": "Yogurt - Blueberry, 175 Gr",
    "price": 22,
    'customization': [
        "Extra Yogurt", "Extra Fruit", "Less Sugar", 'Less Ice'
    ]
}, {
    "id": 4,
    "name": "Oil - Olive Bertolli",
    "price": 8,
    'customization': [
        "Less Oil",
    ]
}, {
    "id": 5,
    "name": "Tomatillo",
    "price": 67,
    'customization': [
        "Extra Tomatos", "Extra Sugar",
    ]
}, {
    "id": 6,
    "name": "Pasta - Ravioli",
    "price": 32,
    'customization': [
        "Extra Pasta", "Extra Sauce", "Extra Meat",
    ]
}, {
    "id": 7,
    "name": "Parsley - Fresh",
    "price": 56,
    'customization': [
        "Whole", "Cut",
    ]
}, {
    "id": 8,
    "name": "Flour - Masa De Harina Mexican",
    "price": 57,
    'customization': [
        "Paper Bag", "Plastic"
    ]
}, {
    "id": 9,
    "name": "Food Colouring - Green",
    "price": 26,
    'customization': [
    ]
}, {
    "id": 10,
    "name": "Sprouts - Onion",
    "price": 55,
    'customization': [
    ]
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

    const [showModal, setShowModal] = useState(null)
    const [test, setTest] = useState(false)
    const handleClick = (id: number) => {
        console.log(id)
    }

    const handleModalOpen = (id) => {
        setShowModal(id)
    }

    const handleModalClose = () => {
        setShowModal(null)
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
                    <Card key={item.id} name={item.name} price={item.price} onButtonClick={() => handleModalOpen(item.id)}></Card>
                    <FullScreenDialog
                        key={item.id}
                        open={showModal == item.id}
                        onClose={handleModalClose}
                        onCloseClick={handleModalClose}
                        title={item.name}
                        renderItems={<>
                            <List>
                                {item.customization.map((options) => <>
                                    <ListItem button>
                                        {options}
                                    </ListItem>
                                    <Divider />
                                </>)}
                            </List>
                        </>}
                    ></FullScreenDialog>
                </Grid>)}
            </Grid>
        </main >
    )
}