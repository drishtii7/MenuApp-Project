import React, { useState } from 'react'
import NoProduct from './NoProduct'
import axios from 'axios'
import {  Alert, Stack } from '@mui/material';
import UpdateProduct from './UpdateProduct';

const Card = ({items,loading,onChangeToggle}) => {
    const [flag,setFlag]=useState(undefined);
    const [isEdit,setEdit]=useState(false);
    const [item,setItem]=useState();


 if(loading)
 {
     return <h2>Loading....</h2>
 }
 
 const onEdit=(item)=>{
  setEdit(true);
  setItem(item);
 }
 const onChangeState=()=>{
   setEdit(false);
 }

 const onDelete=async(id)=>{
        alert(id);
        const token=localStorage.getItem("token");
        const result=await axios.delete("http://127.0.0.1:8083/product/delete/"+id,{
           headers:{
            authorization:token
           }
        });
        console.log(result);
        if(result.data.deleted===true)
        {
          setFlag(true);
          onChangeToggle();// parent child communication

        }else
        {
          setFlag(false);
          onChangeToggle();// send msg to parent component state change
        }
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
  return (
    isEdit===false?(
      <div className="row">
          {
            flag === undefined ? '' : flag === true ? errorAlert("Product Deleted Successfully !", undefined, 'success') : errorAlert('Please try again!', undefined, 'error')
          }
    {
       items!==undefined? items.map((item, idx) => {
            return (
                <div className="col mt-2" key={idx}>
                    <div className="card" style={{ width: "15rem" }}>
                        <img src={`http://localhost:8083/${item.img}`} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{item.pname}</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">{item.desc}</li>
                            <li className="list-group-item"> Rs {item.price}</li>
                        </ul>
                        <div className="d-grid gap-1">
                                <button className='btn btn-success' onClick={()=>onEdit(item)}>Edit</button> 
                                <button className='btn btn-danger ' onClick={()=>onDelete(item._id)}>Delete</button>
                        </div>
    
                    </div>
    
                </div>
    
            )
        }):<NoProduct/>
    
    }
    </div>

    ):<UpdateProduct onChangeState={onChangeState} item={item} onChangeToggle={onChangeToggle}/>    
  )
}

export default Card
