import React, { useState } from 'react'
import mystyle from '../CSS/Style';
import { Grid, Paper, Avatar, Typography, TextField, Button, Radio, IconButton, InputAdornment } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { VisibilityOff } from '@mui/icons-material';
import Visibility from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const SignUp = () => {
    const [showPassword, setPassword] = React.useState(false);
    const [inputs, setInputs] = useState({});
    const [error, setMessage] = useState({});
    const [flag, setFlag] = useState();

    const digitValidation = () => {
        if (inputs.mobile_no.length !== 10 || isNaN(inputs.mobile_no)) {
            setMessage({ 'mobile': true });
            console.log("mobile true");
        } else {
            setMessage({ 'mobile': false });
            console.log('mobile false');
        }
    }
    const alphabetValidation = () => {
        var letters = /^[A-Za-z]+$/;

        if (isNaN(inputs.fname) && inputs.fname.match(letters)) {
            setMessage({ 'fname': true })
            console.log("alphabet true")
        } else {
            setMessage({ 'fname': false })
            console.log("alphabet false")
        }
    }
    const alphabetValidation2 = () => {
        var letters = /^[A-Za-z]+$/;

        if (isNaN(inputs.lname) && inputs.lname.match(letters)) {
            setMessage({ 'lname': true })
            console.log("alphabet lname true")
        } else {
            setMessage({ 'lname': false })
            console.log("alphabet lname false")
        }
    }

    const emailValidation = () => {
        if (!validator.isEmail(inputs.email)) {
            setMessage({ 'email': true })
        } else {
            setMessage({ 'email': false })

        }
    }
    const passwordValidation = () => {
        if (inputs.password.length > 6) {
            setMessage({ 'passwordError': false });
        } else {
            setMessage({ 'passwordError': true });
        }
    }
    const handleChangeAll = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        console.log(" name : " + name + " value :" + value);
        setInputs(values => ({ ...values, [name]: value }))
    }



    const [showPassword2, setShowPassword] = useState(false);
    const handleClickShowPassword2 = () => setShowPassword(!showPassword2);
    const handleMouseDownPassword2 = () => (!showPassword2);

    
    const errorAlert = (msg, bool, style) => {
        setTimeout(() => {// error message remove after 3 seconds
            setFlag(bool);
        }, 5000);

        return (
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity={style}>{msg}</Alert>
            </Stack>
        )

    }

    const handleSubmit = (event) => {
        event.preventDefault();
       // alert(JSON.stringify(inputs));
        registerUser();
    }

    const registerUser = async () => {
        try {
            const userCreated = await axios.post("http://127.0.0.1:8083/users/register", inputs)
            console.log("Created :", userCreated);
            if (userCreated.data.inserted === true) {
                setFlag(true);
            } else {
                setFlag(false);
                //console.log('error');

            }

        } catch (error) {
            setFlag(false);
            console.log("error Page : ", error);
        }
    }

    return (
        <>
            <Grid>
                <Paper elevation={10} style={mystyle.paperStyleSignUp}>

                    <Grid align="center">


                        {
                            flag === undefined ? '' : flag === true ? errorAlert("Account Successfully Created !", undefined, 'success') : errorAlert('Please enter correct mobile number or email !', undefined, 'error')
                        }
                        <h2>Register Here</h2>
                        <br />
                        <br />
                    </Grid>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <TextField autoComplete="given-name" name="fname" error={error.fname === false} helperText={error.fname === false ? 'Please enter only alphabet !' : ''} value={inputs.fname || ""} onChange={handleChangeAll} onKeyUp={alphabetValidation} required fullWidth id="fName" label="FirstName" autoFocus/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="LastName"
                                    name="lname"
                                    error={error.lname === false}
                                    helperText={error.lname === false ? 'Please enter only alphabet !' : ''}
                                    value={inputs.lname || ''}
                                    onChange={handleChangeAll}
                                    onKeyUp={alphabetValidation2}
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth id="phone"
                                    label="Contact"
                                    name="mobile_no"
                                    value={inputs.mobile_no || ''}
                                    error={error.mobile === true}
                                    helperText={error.mobile === true ? 'Mobile Number should be 10 digit !' : ''}
                                    onChange={handleChangeAll}
                                    onKeyUp={digitValidation}
                                    autoComplete="phone"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    error={error.email === true}
                                    helperText={error.email === true ? 'Please enter valid email !' : ''}
                                    value={inputs.email || ''}
                                    onChange={handleChangeAll}
                                    onKeyUp={emailValidation}
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                Gender  :
                                Male
                                <Radio
                                    checked={inputs.gender === 'male'}
                                    onChange={handleChangeAll}
                                    value="male"
                                    required
                                    name="gender"
                                    inputProps={{ 'aria-label': 'A' }}
                                />
                                Female
                                <Radio
                                    checked={inputs.gender === 'female'}
                                    onChange={handleChangeAll}
                                    value="female"
                                    name="gender"
                                    inputProps={{ 'aria-label': 'B' }}
                                />
                                {/* Other

                                <Radio
                                    checked={inputs.gender === 'other'}
                                    onChange={handleChangeAll}
                                    value="other"
                                    name="gender"
                                    inputProps={{ 'aria-label': 'B' }}
                                /> */}
                            </Grid>
                            <Grid item xs={12}>

                                <TextField
                                    required
                                    label='Password'
                                    variant="outlined"
                                    fullWidth
                                    name="password"
                                    error={error.passwordError === true}
                                    helperText={error.passwordError === true ? 'Password must be grater than 6 charachter !' : ''}
                                    value={inputs.password || ''}
                                    type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                                    onChange={handleChangeAll}
                                    onKeyUp={passwordValidation}
                                    // InputProps={{ // <-- This is where the toggle button is added.
                                    //     endAdornment: (
                                    //         <InputAdornment position="end">
                                    //             <IconButton
                                    //                 aria-label="toggle password visibility"
                                    //                 onClick={() => setPassword(!showPassword)}
                                    //             //   onMouseDown={handleMouseDownPassword}
                                    //             >
                                    //                 {showPassword ? <Visibility /> : <VisibilityOff />}
                                    //             </IconButton>
                                    //         </InputAdornment>
                                    //     )
                                    // }}
                                />


                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    label='Confirm Password'
                                    variant="outlined"
                                    fullWidth
                                    name="confirmPassword"
                                    value={inputs.confirmPassword || ''}
                                    type={showPassword2 ? "text" : "password"} // <-- This is where the magic happens
                                    onChange={handleChangeAll}
                                    error={inputs.confirmPassword !== inputs.password}
                                    helperText={inputs.confirmPassword !== inputs.password ? 'Password not match !' : ''}
                                    InputProps={{ // <-- This is where the toggle button is added.
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword2}
                                                    onMouseDown={handleMouseDownPassword2}
                                                >
                                                    {showPassword2 ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />

                            </Grid>

                        </Grid>
                        <Button
                            type="submit" 
                            fullWidth
                            variant="contained" color="secondary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                    </form>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/" variant="button">
                                Already have an account? Log in
                            </Link>
                        </Grid>
                    </Grid>

                </Paper>


            </Grid>



        </>
    )
}

export default SignUp
