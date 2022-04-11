import React, { useEffect, useState } from 'react'
import Customer from './Customer';
import axios from 'axios';

const CustomerDetails = () => {
    const [users,setUsers]=useState();
    const [toggle,setToggle]=useState(false);
  useEffect(()=>{
    try{
      getDetails();

    }catch(error)
    {
      console.error("Error get Details of customer");
    }
      
  },[toggle])
  const getDetails=async()=>{
    const result=await axios.get("http://127.0.0.1:8083/users/findAll",
    { 
      'headers': 
       { 
         'Authorization': localStorage.getItem("token") 
       }
    }
   )
  
      setUsers(result.data);
    

  }

  const onChangeToggle=()=>{
    setToggle(!toggle);
  }
  

  return (
    <>
        {/* <h1 align="center">Customer Details</h1> */}
       {  users!==undefined?<Customer onChangeToggle={onChangeToggle} users={users} />:<h1>Loading...</h1> }      
    </>
  )
}

export default CustomerDetails
