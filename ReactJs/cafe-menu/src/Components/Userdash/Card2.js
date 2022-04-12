import React, { useState } from 'react'
import NoProduct from '../Admin/Menu/NoProduct';
import axios from 'axios'
import {  Alert, Stack } from '@mui/material';
import UpdateProduct from '../Admin/Menu/UpdateProduct';

const Card2 = ({items,loading,onChangeToggle}) => {
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
          onChangeToggle();

        }else
        {
          setFlag(false);
          onChangeToggle();
        }
 }
 const errorAlert = (msg, bool, style) => {
    setTimeout(() => {
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
                    </div>
    
                </div>
    
            )
        }):<NoProduct/>
    
    }
    </div>

    ):<UpdateProduct onChangeState={onChangeState} item={item} onChangeToggle={onChangeToggle}/>    
  )
}

export default Card2
