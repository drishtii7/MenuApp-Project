import React from 'react'
import {Grid,Paper,Tab,Tabs} from '@mui/material';
import mystyle from '../CSS/Style';

import LocalPizzaOutlinedIcon from '@mui/icons-material/LocalPizzaOutlined';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import LiquorOutlinedIcon from '@mui/icons-material/LiquorOutlined';
import MenuItems from './Menu/MenuItems';

const ProductList = () => {
    
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>

            <Grid>
                <Paper style={mystyle.paperStyle}>

                    <Grid align="center">
                        <Tabs value={value} onChange={handleChange} >
                            {/* <Tab icon={<LocalPizzaOutlinedIcon /> }  />
                            <Tab icon={<LunchDiningOutlinedIcon />}  /> */}
                             <Tab label="Starter" />
                             <Tab label="Routine" />
                            <Tab label="Beverage" />
                            {/* <Tab icon={<LiquorOutlinedIcon />}  /> */}
                        </Tabs>
                    </Grid>
                </Paper>
            </Grid>
            {/* {value===0?<Pizza/>:value===1?<Burgers/>:<Drinks/>} */}
            {value===0?<MenuItems ptype="Pizza"/>:value===1?<MenuItems ptype="Burgers"/>:<MenuItems ptype="Beverage"/>}

            

        </>
    )
}

export default ProductList
