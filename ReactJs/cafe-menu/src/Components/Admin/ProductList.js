import React from 'react'
import {Grid,Paper,Tab,Tabs} from '@mui/material';
import mystyle from '../CSS/Style';
import MenuItems from './Menu/MenuItems';

const ProductList = () => {
    
    const [value, setValue] = React.useState(0);

    return (
        <>

            <Grid>
                <Paper style={mystyle.paperStyle}>

                    <Grid align="center">
                        <Tabs value={value} onChange={handleChange} >
                             <Tab label="Starter" />
                             <Tab label="Routine" />
                            <Tab label="Beverage" />
                        </Tabs>
                    </Grid>
                </Paper>
            </Grid>
            {value===0?<MenuItems ptype="Starter"/>:value===1?<MenuItems ptype="Routine"/>:<MenuItems ptype="Beverage"/>}

            

        </>
    )
}

export default ProductList
