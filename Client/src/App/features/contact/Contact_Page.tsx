import {Button, Grid, Typography } from '@mui/material'
//import { RootState } from '../../stores/store'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/stores/store'
import { decrement, increment, incrementByAmount } from '../../redux/slices/counterSlice'
//import { CounterState } from './counterReducer'
// import React from 'react'

export default function Contact_Page() {
  const dispatch: AppDispatch = useDispatch();
  const {value,title} = useSelector((state:RootState)=>state.counter)
  return (
    <>
    <Typography variant='h2'>{title}</Typography>

    <Typography variant='h5'>data:{value}</Typography>
    <Grid container display={'flex'} >
    <Grid item xs={6} md={4} ><Button variant='contained' color='primary' fullWidth onClick={()=>dispatch(increment())}>increment</Button></Grid>
    <Grid item xs={6} md={4}><Button variant='contained' color='error' fullWidth onClick={()=>dispatch(decrement())}>Decrement</Button></Grid>
    <Grid item xs={6} md={4}><Button variant='contained' color='secondary' fullWidth onClick={()=>dispatch(incrementByAmount(4))}>increment by 4</Button></Grid>
    </Grid>
    </>
  )
}
