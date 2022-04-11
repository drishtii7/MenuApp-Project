import React, { useState } from 'react'
import mystyle from '../CSS/Style';
import { Grid, Paper, Alert, Stack, Typography, TextField, Button, MenuItem, Select, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateProduct = ({onChangeState,item,onChangeToggle}) => {

  const [file, setFile] = useState();
  const [flag, setFlag] = useState(undefined);
  const nameOfMenu = ['Pizza', 'Burgers', 'Drinks']
  const [inputs, setInputs] = useState(item);
  const navigate=useNavigate();


  const handleChangeAll = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    console.log(" name : " + name + " value :", value);
    setInputs(values => ({ ...values, [name]: value }))
  }
  const onChangeFile = (e) => {
    console.log('file object', e.target.files[0]);
    var myfile = {};
    myfile = e.target.files[0];
    console.log("myfile", myfile);
    setFile(myfile);
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
    inputs.file = file;
    const formData = new FormData();
    formData.append('id',inputs._id);
    formData.append('pname', inputs.pname);
    formData.append('desc', inputs.desc);
    formData.append('price', inputs.price);
    formData.append('ptype', inputs.ptype);
    formData.append('file', inputs.file);
     console.log(formData);
 //  alert(JSON.stringify(formData));
    updateProduct(formData);

  }

  const updateProduct = async (body) => {
    const token = localStorage.getItem('token');
    console.log(token);
    try {
      const result = await axios.put('http://127.0.0.1:8083/product/update', body, {
        headers: {
          'content-type': 'multipart/form-data',
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
      console.error("error in insert product function");

    }
    inputs.pname='';
    inputs.price='';
    inputs.ptype='';
    inputs.desc='';

  }
  return (
    <div>
      UpdateProduct
      {console.log("input ",inputs)}
      <Grid>
        <Paper style={mystyle.paperStyle}>
          {
            flag === undefined ? '' : flag === true ? errorAlert("Product Added Successfully !", undefined, 'success') : errorAlert('Please try again!', undefined, 'error')
          }
          <Grid align="center">
            <Typography component="h1" variant="h5">Update Product</Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="pname"
              label="Product Name"
              name="pname"
              autoComplete="name"
              autoFocus
              value={inputs.pname || ''}
              onChange={handleChangeAll}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="desc"
              label="Product Description"
              name="desc"
              autoComplete="desc"
              autoFocus
              value={inputs.desc || ''}
              onChange={handleChangeAll}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="price"
              label="Product Price"
              name="price"
              autoComplete="price"
              autoFocus
              value={inputs.price || ''}
              onChange={handleChangeAll}
            />

            <InputLabel id="label">Product Type</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={inputs.ptype || ''}
              label="Product Type"
              name='ptype'
              fullWidth
              required
              onChange={handleChangeAll}
            >
              <MenuItem disabled value="" selected>
                <em>Please Select Type</em>
              </MenuItem>
              {nameOfMenu.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                >
                  {name}
                </MenuItem>
              ))}

            </Select>

            <Stack direction="row" alignItems="center" spacing={2}>


              <input type="file"  onChange={(e) => onChangeFile(e)} />


         
            </Stack>


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



    </div>
  )
}

export default UpdateProduct
