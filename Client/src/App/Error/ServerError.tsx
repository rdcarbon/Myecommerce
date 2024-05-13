//import React from 'react'

import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useNavigate} from "react-router-dom";
type Props={
error?:AxiosError|null;
};
export default function ServerError({error=null}:Props) {
    const navigate=useNavigate()
   
  return (

    <Container component={Paper}>
        {error? 
        (<>
        <Typography variant='h3' color='error' gutterBottom>
            {error.message}
        </Typography>
        <Divider/>
        <Typography>{error.status || 'Internal Server Error'}</Typography>
        </>)
        :
        (<Typography variant="h5" gutterBottom>Internal Server Error</Typography>)
}
        <Button onClick={()=>navigate('/Catalog')}>Return</Button >
    </Container>

  )
}
