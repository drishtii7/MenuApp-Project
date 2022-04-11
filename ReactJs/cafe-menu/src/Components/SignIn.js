import React,{useState} from 'react'
import mystyle from '../CSS/Style';
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link,useNavigate } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const SignIn = () => {

    const [inputs, setInputs] = useState({});
    const [error,setMessage]=useState({});
    const [flag,setFlag]=useState(false);
    const navigate = useNavigate();


    const emailValidation=()=>{
        if(!validator.isEmail(inputs.email))
        {
            setMessage({'email':true})
        }else
        {
            setMessage({'email':false})

        }
    }
   
    const errorAlert = () => {
        setTimeout(() => {// error message remove after 3 seconds
            setFlag(false);
        }, 5000);

        return (
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity='error'>Invalid Email or Password !</Alert>
            </Stack>
        )

    }


    const handleChangeAll = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        
        console.log(" name : "+name+" value :"+value);
        setInputs(values => ({...values, [name]: value}))
      }
      const handleSubmit = (event) => {
        event.preventDefault();
        //alert(JSON.stringify(inputs));
        loginAuthentication();

    }

    const loginAuthentication=async()=>{
        try{
        
              const result=await axios.post("http://127.0.0.1:8083/users/login",inputs);
              console.log(result);
              
              
              if(result.data.loggedIn && result.data.isAdmin)
              {
                localStorage.setItem('token', result.data.token);
                console.log('token set',result.data.token);
                navigate('dashboard');
                 
                console.log("Navigate to Admin page")
              }else if(result.data.loggedIn && result.data.isAdmin===false)
              {
                localStorage.setItem('token', result.data.token);
                navigate('home');
                console.log("Navigate to Customer page")

              }else if(result.data.loggedIn===false)
              {
                  setFlag(true);   
              }else
              {
                  alert("elase part of login check issue");
              }

        }catch(error)
        {
            console.error(error);

        }
    }

    

    return (
        <>
            <Grid>
                <Paper elevation={10} style={mystyle.paperStyle}>

                         {flag?errorAlert():''}
                    <Grid align="center">
                        {/* <Avatar style={mystyle.avatarStyle}>
                            <LockOutlinedIcon />
                        </Avatar> */}
                        <Typography component="h1" variant="h5">Log in</Typography>
                    </Grid>
                    <form onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={error.email===true}
                        helperText={error.email===true? 'Please enter valid email !' : ''}                                  
                        value={inputs.email || ''}
                        onChange={handleChangeAll}
                        onKeyUp={emailValidation}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={handleChangeAll}
                        // onKeyUp={passwordValidation}
                        // error={error.passwordError===true}
                        // helperText={error.passwordError===true? 'Password must be grater than 6 charachter !' : ''}                                                       
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}

                    >
                        Sign In
                    </Button>

                    <Grid container>
                        {/* <Grid item>
                            <Link to="#" variant="body1">
                                Forgot password?
                            </Link>
                        </Grid> */}
                        <Grid item>
                            <Link to="/signup" variant="body1" className='btn btn-success'>
                                {"Register here for new account"}
                            </Link>
                        </Grid>
                    </Grid>
                    </form>
                </Paper>


            </Grid>


        </>
    )
}

export default SignIn
