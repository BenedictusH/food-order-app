'use client'
import * as React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Grid, Typography, List, ListItem, Divider, Button, Checkbox, FormControlLabel, FormControl, FormGroup, FormLabel, TextField } from '@mui/material'
import { styled } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';

import Card from '../components/card';
import { FullScreenDialog } from '../components/dialog';

import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Console } from 'console';
import { type } from 'os';

interface data {
    id: number,
    name: string,
    category: string,
    group: string,
    price: number,
    inSetPrice: number,
    isSetApplicable: boolean,
    customization: string[],
}

const DUMMYDATA = [{
    "id": 1,
    "name": "Honey Lemon Tea",
    "category": "drinks",
    "group": "cold",
    "price": 12,
    "inSetPrice": 4,
    "isSetApplicable": false,
    'customization': [
        "Extra Sugar", "Extra Ice", 'Less Ice', "Less Sugar"
    ]
}, {
    "id": 2,
    "name": "Beef Flank Steak",
    "price": 75,
    "category": "mains",
    "group": "steaks",
    "inSetPrice": 75,
    "isSetApplicable": true,
    'customization': [
        "Rare", "Medidum Rare", "Medium", "Well-done"
    ]
}, {
    "id": 3,
    "name": "Spring Rolls",
    "price": 22,
    "category": 'appetizers',
    "group": 'appetizers',
    "isSetApplicable": false,
    "inSetPrice": 12,
    'customization': [
    ]
}, {
    "id": 4,
    "name": "Spicy Noodle with Beef Tripe",
    "price": 58,
    "category": "mains",
    "group": "noodles",
    "isSetApplicable": true,
    "inSetPrice": 58,
    'customization': [
        "Extra Spicy", "Less Spicy", "Medium Spicy"
    ]
}, {
    "id": 5,
    "name": "Fried Tofu",
    "price": 22,
    "category": "appetizers",
    "group": "appetizers",
    "isSetApplicable": false,
    "inSetPrice": 12,
    'customization': [
    ]
}, {
    "id": 6,
    "name": "Pasta - Ravioli",
    "price": 60,
    "category": "mains",
    "group": "pasta",
    "isSetApplicable": true,
    "inSetPrice": 60,
    'customization': [
        "Extra Sauce", "Less Cheese"
    ]
}, {
    "id": 7,
    "name": "Milk Tea",
    "price": 12,
    "category": "drinks",
    "group": "cold",
    "inSetPrice": 4,
    "isSetApplicable": false,
    'customization': [
        "Extra Sugar", "Extra Ice", 'Less Ice', "Less Sugar"
    ]
}, {
    "id": 8,
    "name": "ALfredo Pasta",
    "price": 60,
    "category": "mains",
    "group": "pasta",
    "isSetApplicable": true,
    "inSetPrice": 60,
    'customization': [
        "Extra Sauce", "Less Cheese"
    ]
}, {
    "id": 9,
    "name": "Black Tea",
    "price": 12,
    "category": 'drink',
    "group": "hot",
    "inSetPrice": 4,
    "isSetApplicable": false,
    'customization': [
        "Extra Sugar", "Extra Ice", 'Less Ice', "Less Sugar"
    ]
}, {
    "id": 10,
    "name": "Shrimp Crackers",
    "price": 32,
    "category": "appetizers",
    "group": "appetizers",
    "isSetApplicable": false,
    "inSetPrice": 20,
    'customization': [
    ]
}]

const DUMMYDATA_APPETIZERS = DUMMYDATA.filter((item) => item.category === "appetizers")
const DUMMYDATA_DRINKS = DUMMYDATA.filter((item) => item.category === "drinks")

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
    const { handleSubmit, control, formState: { errors }, setValue } = useForm({
        mode: 'onSubmit',
        shouldUnregister: true,
        criteriaMode: 'all'
    })

    interface Order {
        id: number,
        name: string,
        customization: string[],
        addOns: string[],
        totalPrice: number
    }

    const [showModal, setShowModal] = useState<number | null>(null)
    const [orders, setOrders] = useState<Order[]>([])
    const [currentOrder, setCurrentOrder] = useState({
        id: 0,
        name: '',
        customization: [],
        addOns: [],
        totalPrice: 0,
    })

    const handleCustomizeChange = (option: string) => {
        if (currentOrder.customization.includes(option)) {
            let newCustomizeArray = currentOrder.customization.filter((item) => item !== option)
            setCurrentOrder({ ...currentOrder, customization: newCustomizeArray })
        }
        else {
            setCurrentOrder({
                ...currentOrder,
                customization: [...currentOrder.customization, option]
            })
        }
    }

    const handleAddOnsChange = (option: string, price: number) => {
        if (currentOrder.addOns.includes(option)) {
            let newAddOnsArray = currentOrder.addOns.filter((item) => item !== option)
            setCurrentOrder({
                ...currentOrder,
                addOns: newAddOnsArray,
                totalPrice: currentOrder.totalPrice - price
            })
        }
        else {
            setCurrentOrder({
                ...currentOrder,
                addOns: [...currentOrder.addOns, option],
                totalPrice: currentOrder.totalPrice + price
            })
        }
    }

    const handleSaveOrder = () => {
        let newOrder: Order = { ...currentOrder }
        setOrders([...orders, newOrder])
        handleModalClose()
    }
    //only render modal if item has customization
    const renderModal = <T extends data>(menuItem: T) => {
        if (menuItem.customization.length === 0) {
            return <></>
        }
        else {
            let item = menuItem;
            return <FullScreenDialog
                key={item.name}
                open={showModal == item.id}
                onClose={handleModalClose}
                onCloseClick={handleModalClose}
                title={item.name}
                renderContent={<>
                    <Typography variant='h5' className='p-4'>
                        Please Selecet the Options (optional)
                    </Typography>
                    <List>
                        {item.customization.map((options) => <>
                            <ListItem button>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    onChange={() => handleCustomizeChange(options)}
                                    value={options}
                                    label={options}
                                    labelPlacement='start'
                                    className='flex justify-between w-full m-0'
                                />
                            </ListItem>
                            <Divider />
                        </>)}
                    </List>
                    {item.isSetApplicable && <>
                        <Typography variant='h5' className='p-4'>
                            Please Select an appetizer (optional)
                        </Typography>
                        <List>
                            {DUMMYDATA_APPETIZERS.map((item) => <>
                                <ListItem button>

                                    <FormControlLabel
                                        control={<Checkbox />}
                                        onChange={() => handleAddOnsChange(item.name, item.inSetPrice)}
                                        value={item.name}
                                        label={`${item.name} (+\$${item.inSetPrice})`}
                                        labelPlacement='start'
                                        className='flex justify-between w-full m-0'
                                    />
                                </ListItem>
                                <Divider />
                            </>)}
                        </List>
                        <Typography variant='h5' className='p-4'>
                            Please Select a drink (optional)
                        </Typography>
                        <List>
                            {DUMMYDATA_DRINKS.map((item) => <>
                                <ListItem button>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        onChange={() => handleAddOnsChange(item.name, item.inSetPrice)}
                                        value={item.name}
                                        label={`${item.name} (+\$${item.inSetPrice})`}
                                        labelPlacement='start'
                                        className='flex justify-between w-full m-0'
                                    />
                                </ListItem>
                                <Divider />
                            </>)}
                        </List>
                    </>}
                    <ListItem className='flex justify-end'>
                        ${currentOrder.totalPrice}
                        <Button onClick={handleSaveOrder} variant='contained' color='secondary' className='ml-4'>Submit</Button>
                    </ListItem>
                </>}
            ></FullScreenDialog>
        }
    }

    const handleClick = () => {
        console.log(DUMMYDATA_APPETIZERS)
        console.log('===ORDERS===')
        console.log(orders)
    }

    const handleModalOpen = (id: number, name: string, price: number) => {
        setShowModal(id)
        setCurrentOrder({
            ...currentOrder,
            id: orders.length === 0 ? 1 : orders.length + 1,
            name: name,
            totalPrice: price
        })
    }

    const handleModalClose = () => {
        setShowModal(null)
        setCurrentOrder({
            id: 0,
            name: '',
            customization: [],
            addOns: [],
            totalPrice: 0,
        })
    }

    return (
        <main style={{ height: '200vh' }}>
            <FixedBackground>
                <Typography variant='h3' className='font-bold backdrop-brightness-50 backdrop-blur-md text-white h-full w-full flex justify-center items-center'>
                    Order Now
                </Typography>
            </FixedBackground>
            <Button onClick={handleClick}> Data Test Button</Button>
            <Grid
                container direction='column' justifyContent='center' alignItems='center' rowSpacing={2}
                className='p-8 md:px-24 min-h-screen m-0'>
                {DUMMYDATA.map((item) =>
                    <Grid item key={item.id}>
                        <Card name={item.name} price={item.price} onButtonClick={() => handleModalOpen(item.id, item.name, item.price)}></Card>
                        {renderModal(item)}
                    </Grid>)}
            </Grid>
        </main >
    )
}