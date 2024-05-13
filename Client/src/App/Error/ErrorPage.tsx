/* eslint-disable no-debugger */
import { Container, Paper, Typography } from '@mui/material'
import { AxiosError } from 'axios';
//import { AxiosError } from 'axios';
import { useRouteError } from 'react-router-dom';
import NotFound from './NotFound';
import ServerError from './ServerError';
// import React from 'react'

export default function ErrorPage() {
    
    const error=useRouteError() as AxiosError

    //console.error(error);
   // if (isRouteErrorResponse(error)){
    if (error.status){
      if (error.status>=500)
      {

          return (<ServerError error={error}/>)
      }
      if (error.status>=400) 
            return (<NotFound error={error}/>);
    
    }
    //}
  return (
    <Container component={Paper}>
{error?.status?
    (<Typography variant='h3'>Error Page {error.status}</Typography>):
    (<Typography variant='h3'>Error Page </Typography>)
}</Container>
  )
  
}
