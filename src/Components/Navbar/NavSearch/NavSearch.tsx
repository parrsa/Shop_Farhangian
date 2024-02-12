import { Grid } from "@mui/material";
import Image from "next/image";
import Logo from '@/Assets/images/HamedanLogo 1.webp'
import MInput from "@/Components/Minput";
import React from "react";
import MTButton from "@/Components/Mbutton";
import MBox from "@/Components/MBox";
import Typography from "@mui/material/Typography";
import Vector from '@/Assets/images/Vector (1).svg'
import Link from "next/link";
import Cookies from 'js-cookie';

const NavSearch = () => {
    const [Check, setCheck] = React.useState(false);
    let Cook = Cookies.get('TokenLogin')

    return (
        <Grid item container lg={12} md={12} sm={12} xs={12} justifyContent={"space-between"} alignItems={'center'} sx={{padding: '20px',display: {xs: 'none', md: 'flex'}}}>
            <Grid item xs={12} md={3} lg={3} container justifyContent={'center'} sx={{ marginBottom: { xs: '20px', md: 0 } }}>
                <Image width={130} src={Logo} alt={'logo'} loading={'lazy'} />
            </Grid>
            <Grid item xs={12} md={6} lg={6} container justifyContent={'center'} sx={{ marginBottom: { xs: '20px', md: 0 } }}>
                <MInput
                    selectBox
                    sx={{ width: { xs: '100%', md: '80%' } }}
                    id="phone"
                    name="phone"
                    type={"text"}
                    label={"جستجو"}
                    placeHolder={'p'}
                />
            </Grid>
            <Grid item xs={12} md={3} lg={3} container justifyContent={Check ? 'space-evenly' : 'center'}>
                {!Cook && (
                    <>
                        <Link href={'/login'}>
                            <MTButton login>
                                <span style={{ marginRight: '0px', fontFamily: 'Yekan Bakh Medium' }}>ورود / ثبت نام</span>
                            </MTButton>
                        </Link>
                    </>
                )}

                {Cook && (
                    <>
                        <MBox UserState sx={{ flexDirection: 'column', justifyContent: 'center' }}>
                            <Typography variant={'caption'}> مانده حساب: <span style={{ marginRight: 10 }}>152.250.000.000 ریال </span></Typography>
                            <Typography variant={'caption'}> میزان بدهی: <span style={{ marginRight: 10 }}>152.250.000.000 ریال </span></Typography>
                        </MBox>

                        <MBox circlebox>
                            <MBox circlebox sx={{ width: '2.5rem', height: '2.5rem', backgroundColor: 'farhangian.yellow' }}>
                                <Image width={50} height={'30'} src={Vector} alt={'vector'} />
                            </MBox>
                        </MBox>
                    </>
                )}
            </Grid>
        </Grid>
    )
}

export default NavSearch;
