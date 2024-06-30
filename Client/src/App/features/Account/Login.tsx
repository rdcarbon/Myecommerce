// import * as React from 'react';
import Avatar from '@mui/material/Avatar';
//import Button from '@mui/material/Button';
//import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import LoadButton from '../../util/LoadButton';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../../redux/stores/store';
import { signInUser } from './AccountSlice';
import AccountCircleOutlined  from '@mui/icons-material/AccountCircleOutlined';
import LoadingComponent from '../Loading/LoadingComponent';
//import {  isAxiosError } from 'axios';
//import {  } from '@mui/material/styles';

/* function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
} */

// TODO remove, this demo shouldn't need to reset the theme.

export default function Login() {
  const navigate=useNavigate();
  const {status}=useAppSelector(state=>state.account)
  const dispatch=useDispatch<AppDispatch>();
    const {register,handleSubmit,setError,formState:{isSubmitting,errors,isValid,isSubmitted}}=useForm()

    const submitForm=async (data:FieldValues)=>{
      try {    
          await dispatch(signInUser(data))
          if (status!="signedin"){
            setError('password',{type:'server',message:"Invalid userName and password"})
            return;
          }
  
        }
      catch(error){
        console.log(error)
      }
    }
// const [values, setValues]=React.useState( {username:'',password:''} as loginUser)
  /* const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    // const data=new FormData(event.currentTarget)
    console.log({
    values
    });
    const response=agent.Account.login(values)
    console.log(response)
    // console.log(
    //     {
    //         email:data.get('email'),
    //         password: data.get('password')
    //     }
    // )
  }; */
/*   const handleInput=(event:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=event.currentTarget;
    setValues({...values,[name]:value} );
  } */
 if (isSubmitting && status=='idle')
  return 
  <LoadingComponent message='Signing In...'/>
 if (isSubmitted && status=='signedin')
  {        
    navigate('/catalog')  
  }
  return (
      <Container component="main" maxWidth="xs" sx={{alignContent:'center'}}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <AccountCircleOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
        
              fullWidth
              id="identifier"
              label="Email Address or Username"
              //name="username"
              autoFocus
              {...register('username',{required:"UserName is required"})}
              required={true}
              error={ errors.username? true :false }
              helperText={errors.username?.message as string}
            />
            {/* {errors.username && <Typography variant="body2" color="error">UserName is required</Typography>} */}
            <TextField
              margin="normal"
   
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password',{required:"Please Enter a Password"})}
              required={true}
              error={(errors.password? true:false)}
              helperText={errors.password?.message as string}

              
            />
            {errors.submission?.message && <Typography variant='body2' color='red'></Typography>}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <LoadButton
            loading={isSubmitting}
              disabled={!isValid}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadButton>
            <Grid container>
              <Grid item xs>
                <Link to="forgotPassword" >
                <Typography variant='body2'>Forgot password?</Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register">
                  <Typography variant='body2'>{"Don't have an account? Sign Up"} </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}