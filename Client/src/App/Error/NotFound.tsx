import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { AxiosError } from "axios";
import {  useNavigate } from "react-router-dom";

type Props={error?:AxiosError}
export default function NotFound({error}:Props) {
  //const {state}=useLocation();
  const navigate=useNavigate();
  return (

    <Container component={Paper}>
        {error? 
        (<>
        <Typography variant='h3' color='error' gutterBottom>
            {error.name}
        </Typography>
        <Divider/>
        <Typography>{error.message || (error.status+  ' Product Not Found')}</Typography>
        </>)
        :
        (<Typography variant="h5" gutterBottom>Not Found</Typography>)
}
        <Button onClick={()=>navigate('/Catalog')}>Return</Button >
    </Container>
  )
}
