// import * as React from 'react';
import Avatar from "@mui/material/Avatar";
//import Button from '@mui/material/Button';
//import CssBaseline from '@mui/material/CssBaseline';
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from '@mui/material/Link';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
//import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import LoadButton from "../../util/LoadButton";
import agent from "../../api/agent";
import { toast } from "react-toastify";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../../redux/stores/store';
//import { signInUser } from './AccountSlice';
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

export default function Register() {
  const navigate = useNavigate();
  // const dispatch=useDispatch<AppDispatch>();
  const {
    register,
    watch,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm({ mode: "onSubmit" });

  const submitForm = async (data: FieldValues) => {
    agent.Account.register(data)
      .then(() => {
        toast.success("Registration successful - you can now login");
        navigate("/login");
      })
      .catch((error) => handleApiErrors(error));
  };
  // navigate('/catalog')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleApiErrors(errors: any) {
    console.log(errors);
    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes("Password")) {
          setError("password", { message: error });
        } else if (error.includes("Email")) {
          setError("email", { message: error });
        } else if (error.includes("Username")) {
          setError("username", { message: error });
        }else if (error.includes('confirm_password')){
          setError("confirm_password", {message:error})
        }
      
      });
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
  return (
    <Container component="main" maxWidth="xs" sx={{ alignContent: "center" }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AccountCircleOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(submitForm)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="Username"
            label="Username"
            //name="username"
            
            {...register("username", { required: true })}
            required={true}
            error={errors.username ? true : false}
            helperText={"UserName is required"}
          />
          <TextField
            margin="normal"
            fullWidth
            id="Email"
            label="Email Address"
            //name="username"
            {...register("email", {
              required: true,
              pattern: {
                value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                message: "Not a valid email address",
              },
            })}
            required={true}
            error={errors.email ? true : false}
            helperText={"Email is required"}
          />
          {/* {errors.username && <Typography variant="body2" color="error">UserName is required</Typography>} */}
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password", { required: "Enter a Valid Password" })}
            required={true}
            error={errors.password ? true : false}
            helperText={errors.password?.message as string}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Confirm_Password"
            type="password"
            id="confirm_password"
           // autoComplete="current-password"
            {...register("confirm_password", {
              validate: (val: string) => { 
              if (watch('password') != val) { 
                const msg="Your passwords do no match"
                setError('password',{message:msg})
                return msg;
                }
              },
             })}
            required={true}
            error={errors.confirm_password ? true : false}
            helperText={errors?.confirm_password?.message as string}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <LoadButton
            loading={isSubmitting}
           //disabled={!isValid}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </LoadButton>
          <Grid container>
            <Grid item xs>
              <Link to="forgotPassword">
                <Typography variant="body2">Forgot password?</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link to="/login">
                <Typography variant="body2">
                  {"Already have an account? Sign In"}{" "}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
