import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from './Card';
import Pagination from './Pagination';

const MenuItems = ({ ptype }) => {

    const [items, setItem] = useState();
    const [toggle,setToggle]=useState(false);
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const [currentPage,setCurrentPage]=useState(1);
    const [itemPerPage,setItemPerPage]=useState(5);


    useEffect(() => {
        const token = localStorage.getItem("token");
        setLoading(true);
        axios.get("http://127.0.0.1:8083/product/items/" + ptype, {
            "headers": {
                "authorization": token
            }
        }).then(res => {
            setItem(res.data)
            setLoading(false)

        
        })
            .catch(error => {
                 setItem(true)
                // session Time out 
                setLoading(false)
                 navigate('/')

            })


    }, [ptype,toggle])

    const onChangeToggle=()=>{
        setToggle(!toggle);
    }
    return (
        <div className="container">
            {items === true ? console.log("error") : console.log("here", items)}
            <Card items={items} loading={loading} onChangeToggle={onChangeToggle} />
             
        </div>
    )
}

export default MenuItems
