import React,{useState} from 'react'
import mystyle from '../CSS/Style';
import { Grid, Paper, Alert, Stack, Typography, TextField, Button, MenuItem, Select, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const CustomerUpdate = ({onChangeState,item,onChangeToggle}) => {
    
    const [flag, setFlag] = useState(undefined);
    const [inputs, setInputs] = useState(item);
    const navigate=useNavigate();
  
  
    const handleChangeAll = (event) => {
      const name = event.target.name;
      const value = event.target.value;
  
      console.log(" name : " + name + " value :", value);
      setInputs(values => ({ ...values, [name]: value }))
    }
    
  
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
      const formData = new FormData();
      formData.append('id',inputs._id);
      formData.append('fname', inputs.fname);
      formData.append('lname', inputs.lname);
      formData.append('mobile_no', inputs.mobile_no);
      formData.append('email', inputs.email);
       console.log(formData);
   //  alert(JSON.stringify(formData));
      updateCustomer(formData);
  
    }
  
    const updateCustomer = async (body) => {
      const token = localStorage.getItem('token');
      console.log(token);
      try {
        const result = await axios.patch('http://127.0.0.1:8083/users/update', inputs, {
          headers: {
            // 'content-type': 'multipart/form-data',
            'Authorization': token
          }
        });
        console.log(result);
        if(result.isLoggedIn===false)
        {
           navigate('/')
        }
        if (result.data.updated === true) {
          //    inputs.pname='';
          //    inputs.price='';
          //    inputs.ptype='';
          //    inputs.desc='';
             setFlag(true);
  
             onChangeState();
             onChangeToggle();
        } else 
        { 
      //   inputs.pname='';
      //   inputs.price='';
      //   inputs.ptype='';
      //   inputs.desc='';
         setFlag(false);
        
        }
  
      } catch (error) {
  
      //   inputs.pname='';
      //   inputs.price='';
      //   inputs.ptype='';
      //   inputs.desc='';
        setFlag(false);
        navigate('/')
        console.error("error in insert product function",error);
  
      }
      inputs.fname='';
      inputs.lanme='';
      inputs.mobile_no='';
      inputs.email='';
  
    }

  return (
    <div>
    UpdateProduct
    {console.log("input ",inputs)}
    <Grid>
      <Paper style={mystyle.paperStyle}>
        {
          flag === undefined ? '' : flag === true ? errorAlert("Customer Updated Successfully !", undefined, 'success') : errorAlert('Please try again!', undefined, 'error')
        }
        <Grid align="center">
          <Typography component="h1" variant="h5">Update CustomerDetails</Typography>
        </Grid>
        <form onSubmit={handleSubmit}>

          <TextField
            margin="normal"
            required
            fullWidth
            id="pname"
            label="Name"
            name="fname"
            autoComplete="name"
            autoFocus
            value={inputs.fname || ''}
            onChange={handleChangeAll}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="lname"
            autoComplete="name"
            autoFocus
            value={inputs.lname || ''}
            onChange={handleChangeAll}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="mobile"
            label="Mobile"
            name="mobile_no"
            autoComplete="mobile"
            autoFocus
            value={inputs.mobile_no || ''}
            onChange={handleChangeAll}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="price"
            label="email"
            name="email"
            autoComplete="email"
            autoFocus
            value={inputs.email || ''}
            onChange={handleChangeAll}
          />

        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}

          >
            Update
          </Button>


        </form>
      </Paper>


    </Grid>



  </div>  )
}

export default CustomerUpdate
