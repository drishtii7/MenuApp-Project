import React from 'react'
import {Grid,Paper,Tab,Tabs} from '@mui/material';
import mystyle from '../CSS/Style';

import LocalPizzaOutlinedIcon from '@mui/icons-material/LocalPizzaOutlined';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import LiquorOutlinedIcon from '@mui/icons-material/LiquorOutlined';
import MenuItems2 from './MenuItems2';

const ProductList2 = () => {
    
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
                            <Tab icon={<LocalPizzaOutlinedIcon /> }  />
                            <Tab icon={<LunchDiningOutlinedIcon />}  />
                            <Tab icon={<LiquorOutlinedIcon />}  />
                        </Tabs>
                    </Grid>
                </Paper>
            </Grid>
            {/* {value===0?<Pizza/>:value===1?<Burgers/>:<Drinks/>} */}
            {value===0?<MenuItems2 ptype="Pizza"/>:value===1?<MenuItems2 ptype="Burgers"/>:<MenuItems2 ptype="Beverage"/>}

            

        </>
    )
}

export default ProductList2
