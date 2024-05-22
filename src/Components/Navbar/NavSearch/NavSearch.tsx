import { Box, Grid, Modal } from "@mui/material";
import Image from "next/image";
import Logo from '@/Assets/images/HamedanLogo 1.webp'
import MInput from "@/Components/Minput";
import React, { useEffect } from "react";
import MTButton from "@/Components/Mbutton";
import Typography from "@mui/material/Typography";
import Vector from '@/Assets/images/Vector (1).svg'
import Link from "next/link";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import colors from "@/Assets/theme/base/colors";
import url from '@/Api';
import { userInfo } from "os";
const styles = {
    position: 'absolute' as 'absolute',
    textAlign: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    color: 'red.main',
    border: 'none',
    outline: 'none',
    borderRadius: 2,
    boxShadow: 24,
    p: 2,
};
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
                const response = await fetch(`${url}/api/User/Profile`, config);
                const data = await response.json();
                setUserInfo(data.data);
                console.log(data.data)

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

    const [openModlas, setOpenModals] = React.useState(false);
    const handleCloses = () => setOpenModals(false);
    React.useEffect(() => {
        if (Cook) {
            setOpenModals(true)
        }
    }, [])
    return (
        <React.Fragment>
            <Grid item container lg={12} md={12} sm={12} xs={12} justifyContent={"space-between"} alignItems={'center'}
                sx={{ padding: '20px', display: { xs: 'none', md: 'flex' } }}>
                <Grid item xs={12} md={3} lg={3} container justifyContent={'center'}
                    sx={{ marginBottom: { xs: '20px', md: 0 } }}>
                    <Image width={150} src={Logo} alt={'logo'} loading={'lazy'} />
                </Grid>
                <Grid item xs={12} md={6} lg={Cook ? 5 : 6} container justifyContent={'center'}
                    sx={{ marginBottom: { xs: '20px', md: 0 } }}>
                    <MInput
                        popup
                        sx={{ width: { xs: '100%', md: '80%' } }}
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
                                    <span style={{ marginRight: '0px', fontFamily: 'Shabname' }}>ورود به سامانه</span>
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
                                <Typography variant={'caption'} color={'#fff'}> مبلغ قسط ماه جاری: <span
                                    style={{ marginRight: 10 }}>{UserInfo?.mablagheGhest?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ریال </span></Typography>
                                <Typography variant={'caption'} color={'#fff'}>  مبلغ مانده بدهی: <span
                                    style={{ marginRight: 10 }}>{UserInfo?.mablagheMande?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ریال </span></Typography>
                                <Typography variant={'caption'} color={'#fff'}>میزان اخرین سرمایه : <span
                                    style={{ marginRight: 10 }}>{UserInfo?.mablaghSarmaye?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ریال </span></Typography>

                                {/* <Typography variant={'caption'} color={'#fff'}> مبلغ کل : <span */}
                                {/* // style={{ marginRight: 10 }}>{UserInfo?.mablagheVam?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ریال </span></Typography> */}


                            </Grid>
                            {/*<MBox UserState sx={{ flexDirection: 'column', justifyContent: 'center' }}>*/}
                            {/*    <Typography variant={'caption'}> مبلغ قسط: <span style={{ marginRight: 10 }}>{UserInfo?.mablagheGhest?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ریال </span></Typography>*/}
                            {/*    <Typography variant={'caption'}> مبلغ مانده: <span style={{ marginRight: 10 }}>{UserInfo?.mablagheMande?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ریال </span></Typography>*/}
                            {/*    <Typography variant={'caption'}> مبلغ وام: <span style={{ marginRight: 10 }}>{UserInfo?.mablagheVam?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ریال </span></Typography>*/}
                            {/*</MBox>*/}


                            <Grid item container lg={2} justifyContent={'center'} alignItems={'center'}>
                                <Box sx={{
                                    width: '3.2rem',
                                    height: '3.2rem',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: colors.farhangian.blue,
                                }}>
                                    <Box
                                        sx={{
                                            width: '2.5rem', height: '2.5rem', backgroundColor: 'farhangian.yellow',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Image width={50} height={'30'} src={Vector} alt={'vector'} />
                                    </Box>
                                </Box>
                                {/*<Typography color={'black.main'}>{UserInfo?.firstName} {UserInfo?.lastName}</Typography>*/}
                            </Grid>


                        </>
                    )}
                </Grid>
            </Grid>
            <Modal
                open={openModlas}
                onClose={handleCloses}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles}>
                    {Cook && UserInfo && (
                        <>
                            <Grid item container lg={12} color={'black.main'}>
                                {UserInfo?.userType === 0 && (<>
                                    <Typography variant={'h3'} sx={{ lineHeight: 2 }}>
                                        <span>{UserInfo?.firstName} {UserInfo.lastName} </span> عزیز
                                        به فروشگاه ما خوش آمدید، اینجا جایی است که شما شاغلین گرامی می‌توانید محصولات جدید را کشف کنید و مقادیر اقساط خود را بررسی نمایید. امیدواریم که تجربه خرید شما در اینجا، به یک تجربه فوق‌العاده تبدیل شود.

                                        ما در اینجا با افتخار به شما خدمت می‌کنیم و همواره در دسترس هستیم تا به شما در انتخاب بهترین محصولات و رفع هرگونه سوال یا مشکل کمک کنیم.

                                        همچنین، برای راحتی شما، می‌توانید محصولات جدید را که هم اکنون در فروشگاه ما موجود است را بررسی کنید و همچنین صورتحساب خود را مشاهده نمایید.
                                    </Typography>


                                </>)}

                                {UserInfo?.userType === 1 && (<>
                                    <Typography variant={'h3'} sx={{ lineHeight: 2 }}>
                                        <span>{UserInfo?.firstName} {UserInfo.lastName} </span> عزیز
                                        به فروشگاه ما خوش آمدید، اینجا جایی است که شما بازنشستگان گرامی می‌توانید محصولات جدید را کشف کنید و مقادیر اقساط خود را بررسی نمایید. امیدواریم که تجربه خرید شما در اینجا، به یک تجربه فوق‌العاده تبدیل شود.

                                        ما در اینجا با افتخار به شما خدمت می‌کنیم و همواره در دسترس هستیم تا به شما در انتخاب بهترین محصولات و رفع هرگونه سوال یا مشکل کمک کنیم.

                                        همچنین، برای راحتی شما، می‌توانید محصولات جدید را که هم اکنون در فروشگاه ما موجود است را بررسی کنید و همچنین صورتحساب خود را مشاهده نمایید.
                                    </Typography>


                                </>)}

                                {UserInfo?.userType === null && (<>
                                    <Typography variant={'h3'} sx={{ lineHeight: 2 }}>
                                        <span>{UserInfo?.firstName}</span> عزیز
                                            شما به عنوان ادمین وبسایت وارد شده اید
                                            جهت مدیریت وبسایت و تغییر و اضافه کردن محصولات , اخبار , ویا اضافه کردن فایل 
                                            اکسل میتوانید به قسمت تنظیمات داشبورد رفته و تمامی ایتم هارو مشاهده کنید ! 
                                            با تشکر
                                    </Typography>


                                </>)}
                            </Grid>


                        </>
                    )}
                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default NavSearch;
