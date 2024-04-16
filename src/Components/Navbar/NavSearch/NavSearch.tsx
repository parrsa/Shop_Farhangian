import {Box, Grid} from "@mui/material";
import Image from "next/image";
import Logo from '@/Assets/images/HamedanLogo 1.webp'
import MInput from "@/Components/Minput";
import React, {useEffect} from "react";
import MTButton from "@/Components/Mbutton";
import Typography from "@mui/material/Typography";
import Vector from '@/Assets/images/Vector (1).svg'
import Link from "next/link";
import Cookies from 'js-cookie';
import {useRouter} from "next/router";
import colors from "@/Assets/theme/base/colors";

const NavSearch = () => {
    const [Check, setCheck] = React.useState(false);
    let Cook = Cookies.get('TokenLogin')
    const [UserInfo, setUserInfo] = React.useState<any>([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${Cook}`,
                    },
                };
                const response = await fetch(`https://farhangian.birkar.ir/api/User/Profile`, config);
                const data = await response.json();
                setUserInfo(data.data);

            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const [inputValue, setInputValue] = React.useState('');
    const router = useRouter();

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            router.push(`/Search?title=${encodeURIComponent(inputValue)}`);
        }
    };

    const handleChange = (event: any) => {
        setInputValue(event.target.value);
    };

    return (
        <Grid item container lg={12} md={12} sm={12} xs={12} justifyContent={"space-between"} alignItems={'center'}
              sx={{padding: '20px', display: {xs: 'none', md: 'flex'}}}>
            <Grid item xs={12} md={3} lg={3} container justifyContent={'center'}
                  sx={{marginBottom: {xs: '20px', md: 0}}}>
                <Image width={150} src={Logo} alt={'logo'} loading={'lazy'}/>
            </Grid>
            <Grid item xs={12} md={6} lg={Cook ? 5 : 6} container justifyContent={'center'}
                  sx={{marginBottom: {xs: '20px', md: 0}}}>
                <MInput
                    popup
                    sx={{width: {xs: '100%', md: '80%'}}}
                    id="phone"
                    name="phone"
                    type={"text"}
                    label={"جستجو"}
                    value={inputValue}
                    placeHolder={'p'}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                />
            </Grid>
            <Grid item xs={12} md={3} lg={Cook ? 4 : 3} container justifyContent={Check ? 'space-evenly' : 'center'}>
                {!Cook && (
                    <>
                        <Link href={'/login'}>
                            <MTButton login>
                                <span style={{marginRight: '0px', fontFamily: 'Shabname'}}>ورود به سامانه</span>
                            </MTButton>
                        </Link>
                    </>
                )}

                {Cook && (
                    <>
                        <Grid sx={{
                            width: '16rem',
                            borderRadius: '0.5rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: colors.farhangian.blue, flexDirection: 'column',
                        }}>
                            <Typography variant={'caption'}> مبلغ قسط: <span
                                style={{marginRight: 10}}>{UserInfo?.mablagheGhest?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ریال </span></Typography>
                            <Typography variant={'caption'}> مبلغ مانده: <span
                                style={{marginRight: 10}}>{UserInfo?.mablagheMande?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ریال </span></Typography>
                            <Typography variant={'caption'}> مبلغ بدهی: <span
                                style={{marginRight: 10}}>{UserInfo?.mablagheVam?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ریال </span></Typography>
                        </Grid>
                        {/*<MBox UserState sx={{ flexDirection: 'column', justifyContent: 'center' }}>*/}
                        {/*    <Typography variant={'caption'}> مبلغ قسط: <span style={{ marginRight: 10 }}>{UserInfo?.mablagheGhest?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ریال </span></Typography>*/}
                        {/*    <Typography variant={'caption'}> مبلغ مانده: <span style={{ marginRight: 10 }}>{UserInfo?.mablagheMande?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ریال </span></Typography>*/}
                        {/*    <Typography variant={'caption'}> مبلغ وام: <span style={{ marginRight: 10 }}>{UserInfo?.mablagheVam?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ریال </span></Typography>*/}
                        {/*</MBox>*/}


                        <Grid item container lg={2} justifyContent={'center'} alignItems={'center'}>
                            <Box sx={{     width: '3.2rem',
                                height: '3.2rem',
                                borderRadius: '50%',
                                display: 'flex',
                                flexDirection:'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: colors.farhangian.blue,}}>
                                <Box
                                      sx={{width: '2.5rem', height: '2.5rem', backgroundColor: 'farhangian.yellow' ,
                                          borderRadius: '50%',
                                          display: 'flex',
                                          flexDirection:'column',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                      }}>
                                    <Image width={50} height={'30'} src={Vector} alt={'vector'}/>
                                </Box>
                            </Box>
                            {/*<Typography color={'black.main'}>{UserInfo?.firstName} {UserInfo?.lastName}</Typography>*/}
                        </Grid>


                    </>
                )}
            </Grid>
        </Grid>
    )
}

export default NavSearch;
