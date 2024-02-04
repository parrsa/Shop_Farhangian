import React from "react";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";

const NavTop = () => {
    const [p, setP] = React.useState([])
    let bgColors=p.map((i)=>i.backColor)
    console.log(p)
    React.useEffect(() => {
        const getData = async () => {
            const response = await fetch(`https://farhangian.birkar.ir/api/Slogan/GetAll`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setP(data.data)
        }

        getData();
    }, [])

    let Sp = p.map((item: any) => item.title);
    const [Random, setRandom] = React.useState();
    React.useEffect(() => {
        const intervalId = setInterval(() => {
            let A = Math.floor(Math.random() * Sp.length);
            setRandom(Sp[A]);
        }, 3500);
        return () => clearInterval(intervalId);
    }, [Sp]);


    return (
        <>
            {p && (
                <Grid item container bgcolor={bgColors.map((i)=>i)} lg={12}>
                    <Typography variant={'h1'} color={'blue.main'} p={1}>
                        {Random}
                        {/*فروشگاه فرهنگیان سال نو را به شما مشتریان عزیز تبریک گفته و امیدوار است سالی نیکو و سرشار از*/}
                        {/*سلامتی را داشته باشید .*/}
                    </Typography>
                </Grid>
            )}
        </>

    )
}
export default NavTop
