import React, { useEffect,useState } from 'react'
import {  Alert, Stack } from '@mui/material';
import axios from 'axios';
import UserUpdate from './UserUpdate';

const User = ({onChangeToggle,users}) => {

    const [flag,setFlag]=useState(undefined);
    const [isEdit,setEdit]=useState(false);
    const [item,setItem]=useState();

    const onEdit=(item)=>{
        setEdit(true);
        setItem(item);
       }
       const onChangeState=()=>{
         setEdit(false);
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

   const onDelete=async(id)=>{
       // alert(id);
        const token=localStorage.getItem("token");
        const result=await axios.delete("http://127.0.0.1:8083/users/delete/"+id,{
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
    

  return (
    isEdit===false?(<div className="table-responsive">
    {console.log("users",users.users)}
    {
        flag === undefined ? '' : flag === true ? errorAlert("Customer Deleted Successfully !", undefined, 'success') : errorAlert('Please try again!', undefined, 'error')
      }
  <table className="table  table-hover">
<thead>
<tr>
  <th>No</th>
  <th>Name</th>
  <th>Surname</th>
  <th >Mobile</th>
  <th>Email</th>
</tr>
</thead>
<tbody>
{
    users.users!==undefined?users.users.map((user,idx)=>{
        return(
           <tr key={idx}>
           <th>{idx+1}</th>
           <td>{user.fname}</td>
           <td>{user.lname}</td>
           <td>{user.mobile_no}</td>
           <td>{user.email}</td>
           <td><button className='btn btn-warning' onClick={()=>onEdit(user)}>Edit</button></td>
           <td><button className='btn btn-danger' onClick={()=>onDelete(user._id)}>Delete</button></td>
         </tr>
        )
    }):'No Record Found'
}

</tbody>
</table>

</div>
):<UserUpdate onChangeState={onChangeState} item={item} onChangeToggle={onChangeToggle}/>

  )
}

export default User
