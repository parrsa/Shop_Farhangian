import React from "react";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";

const NavTop = () => {
    const [p,setP]=React.useState(true)
    return(
        <>
        {p && (
           <Grid item container bgcolor={'farhangian.main'} lg={12}>
               <Typography variant={'h1'} color={'blue.main'} p={1}>
                   فروشگاه فرهنگیان سال نو را به شما مشتریان عزیز تبریک گفته و امیدوار است سالی نیکو و سرشار از سلامتی را داشته باشید .
               </Typography>
           </Grid>
        )}
        </>

    )
}
export default NavTop
