'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Grid, Typography, Button } from '@mui/material'

export default function Demo() {
    const router = useRouter()

    return (
        <main>
            <Grid container direction='column' justifyContent='center' alignItems='center' rowSpacing={2} className='p-8 md:p-24 w-screen min-h-screen m-0'>
                <Grid item>
                    <Typography className='text-4xl lg:text-6xl text-center'>
                        Welcome to HungKor
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant='outlined' onClick={() => router.push('/main')} className='text-md lg:text-lg'>
                        Order Now
                    </Button>
                </Grid>
            </Grid>
        </main>
    )
}
