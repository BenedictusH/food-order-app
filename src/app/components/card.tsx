import { Card as BaseCard, Box, CardContent, Typography, CardMedia, Button } from "@mui/material"

type props = {
    name: string,
    price: number,
    onButtonClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => void
}

export default function Card({
    name,
    price,
    onButtonClick
}: props) {
    return (
        <BaseCard className='flex' elevation={3}>
            <Box className='flex flex-col p-2' sx={{ width: 300 }}>
                <CardContent className='flex flex-col'>
                    <Typography component="div" variant="h5">
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        ${price}
                    </Typography>
                </CardContent>
                <Box className='flex justify-end'>
                    <Button variant='outlined' onClick={onButtonClick}>
                        Add
                    </Button>
                </Box>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image="https://placehold.co/151"
                alt="Live from space album cover"
            />
        </BaseCard >
    )
}