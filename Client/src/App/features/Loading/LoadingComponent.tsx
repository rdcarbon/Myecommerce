import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

interface Props{
    message?:string;
}
function LoadingComponent({message="Loading ....."}:Props) {
  return (
    <Backdrop open={true} invisible={true}>
      <Box
        display="flex"
        sx={{ justifyContent: "center", alignItems: "center", height: "100vh" }}
      >
        <CircularProgress color="secondary" size={100} />
        <Typography variant='h4' sx={{justifyContent:'center', position:'fixed',top:'60%'}}>{message}</Typography>
      </Box>
      ;
    </Backdrop>
  );
}

export default LoadingComponent;
