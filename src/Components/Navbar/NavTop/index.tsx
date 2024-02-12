import React from "react";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";

const NavTop = () => {
    const [p, setP] = React.useState([])
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
    let Sp1 = p.map((item: any) => item.backColor);
    let Sp2 = p.map((item: any) => item.color);
    const [Random, setRandom] = React.useState<any>();
    const [Random1, setRandom1] = React.useState<any>();
    const [Random2, setRandom2] = React.useState<any>();
    React.useEffect(() => {
        const intervalId = setInterval(() => {
            let A = Math.floor(Math.random() * Sp.length);
            setRandom(Sp[A]);
            setRandom2(Sp1[A]);
            setRandom1(Sp2[A]);
        }, 1800);
        return () => clearInterval(intervalId);
    }, [Sp]);


    return (
        <>
            {p && (
                <Grid item container bgcolor={Random2} lg={12} p={1}>
                    <Typography variant={'h1'} color={Random1} >
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
