import React from "react";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";

const NavTop = () => {
    const [p,setP]=React.useState(true)
    React.useEffect(()=>{
        const getData = async () => {
            const response = await fetch(`https://farhangian.birkar.ir/Slogan/GetAllSlogan`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setP(data)
        }

        getData();
    },[])

    console.log('parsa',p)

    return(
        <>
        {p && (
           <Grid item container bgcolor={'farhangian.main'} lg={12}>
               <Typography variant={'h1'} color={'blue.main'} p={1}>
                   {/*{p.data.title}*/}
                   فروشگاه فرهنگیان سال نو را به شما مشتریان عزیز تبریک گفته و امیدوار است سالی نیکو و سرشار از سلامتی را داشته باشید .
               </Typography>
           </Grid>
        )}
        </>

    )
}
export default NavTop
