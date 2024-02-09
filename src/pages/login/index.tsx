// import next from 'next';
// import {useFormik} from 'formik';
// import {Alert, Box, Grid, Snackbar, Typography} from '@mui/material';
// import {useEffect, useState} from 'react';
// import * as yup from 'yup';
// import MInput from '@/Components/Minput';
// import MTButton from '@/Components/Mbutton';
// import Image from 'next/image'
// import axios from 'axios'
// import logo from '@/Assets/images/computer-security-with-login-password-padlock (1) 1.png'
// import BirkarSeystem from '@/Assets/images/Artboard 1 (3) 1 (1).png'
// import React from 'react';
// import {Theme, useTheme} from '@emotion/react';
//
// import MBox from "@/Components/MBox";
//
// const background = require("../../Assets/images/5066999 2.png")
//
// const formValidationSchema = yup.object({
//     userName: yup.string().required('عنوان الزامی است'),
//     password: yup.string().required('پسورد الزامی است')
//         .min(5, 'پسورد باید حداکثر 8 حرف باشد')
// });
//
// const Index = () => {
//     const theme = useTheme() as Theme;
//     const formik = useFormik({
//         initialValues: {
//             userName: '',
//             password: '',
//         },
//         validationSchema: formValidationSchema,
//         onSubmit: (values) => {
//         }
//     });
//     return (
//         <MBox backgroundImage backUrl={require("../../Assets/images/3d-smartphone.svg").default.src}>
//             <Grid item container justifyContent={'start'} alignItems={'center'} height={'100vh'}>
//                 <Grid item container lg={3.5} bgcolor={'white.main'} boxShadow={5} ml={{lg:5}} justifyContent={'center'}  sm={12} md={10}  height={'90vh'} borderRadius={'1rem'}>
//                     <Grid item container justifyContent={'center'} bgcolor={'blue.main'} alignItems={'center'} lg={6} md={6} sm={6} p={2} flexDirection={"column"}>
//                         <Grid item container justifyContent={'center'} alignItems={'center'}>
//                             <Image src={logo} alt="Website logo" width={300} height={250}/>
//                         </Grid>
//                         <Grid item container justifyContent={'center'} p={2} alignItems={"end"}>
//                             <form onSubmit={formik.handleSubmit}>
//                                 <Grid item container justifyContent={'center'} alignItems={'center'}>
//                                     <MInput
//                                         popup
//                                         id="userName"
//                                         name="userName"
//                                         label="نام کاربری"
//                                         value={formik.values.userName}
//                                         onChange={formik.handleChange}
//                                         onBlur={formik.handleBlur}
//                                         error={formik.touched.userName && Boolean(formik.errors.userName)}
//                                         helperText={formik.touched.userName && formik.errors.userName}
//                                     />
//                                 </Grid>
//                                 <Grid item container justifyContent={'center'} alignItems={'center'}
//                                       marginTop={{xs: 2, lg: 4}}>
//                                     <MInput
//                                         popup
//                                         id="password"
//                                         name="password"
//                                         label="رمز عبور"
//                                         type="password"
//                                         value={formik.values.password}
//                                         onChange={formik.handleChange}
//                                         onBlur={formik.handleBlur}
//                                         error={formik.touched.password && Boolean(formik.errors.password)}
//                                         helperText={formik.touched.password && formik.errors.password}
//                                     />
//                                 </Grid>
//                                 <Grid item container justifyContent={'center'} alignItems={'center'} marginTop={4}>
//                                     <MTButton color="primary" variant="contained" login type="submit">
//                                         ورود
//                                     </MTButton>
//                                 </Grid>
//                             </form>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </MBox>
//
//     )
// }
// export default Index

import React from "react";
import {Grid, Typography, IconButton} from "@mui/material";
import {useFormik} from 'formik';
import {useNavigate} from "react-router-dom";
import * as yup from 'yup';
import axios from 'axios';
import colors from "@/Assets/theme/base/colors";
import Myimg from '@/Assets/images/Rectangle.png';
import FormControl from '@mui/material/FormControl';
import MTButton from "@/Components/Mbutton";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';
import MInput from "@/Components/Minput";


const formValidationSchema = yup.object({
    phone: yup.string().required('شماره موبایل الزامی است'),
    pass: yup.string().required('رمزعبور الزامی است'),
});

import Image from 'next/image'
import DashboardLayout from "@/Components/Dashboard/Layout";
import Link from "next/link";

const SignInPage = () => {
    // const Swal = require('sweetalert2')
    // const navigate = useNavigate()
    // const [Cookiess, SetCookies] = useCookies(['TokenLogin'])
    const [openMessage, setOpenMessage] = React.useState(false);
    const [typeMessage, setTypeMessage] = React.useState('')
    const [showVerify, setshowVerify] = React.useState(false);
    const [message, setMessage] = React.useState()
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event:any) => {
        event.preventDefault();
    };

    const handleClose = (event:any, reason:any) => {
        setOpenMessage(false);
    };
    const formik = useFormik({
        initialValues: {
            phone: '',
            pass: '',
        },
        validationSchema: formValidationSchema,
        onSubmit: (values) => {
            const login = async () => {
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
                try {
                    const response = await axios.post(`/user/login/`,
                        {
                            username: values.phone,
                            password: values.pass,
                        },
                        config
                    )
                    if (response.status === 200) {
                        // setshowVerify(true)
                        // SetCookies("Tokenlogin", response.data.token)
                        // setMessage('با موفقیت وارد شدید')
                        setTypeMessage('success')
                        setOpenMessage(true)
                        setTimeout(() => {
                            // navigate('/')
                        }, 3000)
                    }
                } catch (error:any) {
                    setTypeMessage('error')
                    setOpenMessage(true)
                    setMessage(error.response.data.message)
                }
            }
            login();
        },
    });


    return (
        <DashboardLayout>
        <Grid container sx={{backgroundSize: {xs: 'cover', md: "cover", lg: 'cover'}}} height={{lg: "91vh", md: '105vh'}} flexDirection={{md: 'column-reverse', xs: 'column-reverse'}} justifyContent={"center"} alignItems={"center"} lg={12} md={12}>
            <Grid item container height={"100%"}
                //  zIndex={{ xs: 1 }}
                  alignItems={"center"} justifyContent={"center"} lg={6} md={6} xs={6}>
                <Grid item container md={10}  justifyContent={'center'} marginTop={{lg: 2}}>
                    <Grid item container md={10}  justifyContent={"center"} marginTop={{lg: 2}}>
                        <Grid item container md={10} justifyContent={"center"}>
                            <Grid item container borderLeft={{lg: 3, md: 0}} borderColor={{lg: '#D6C109'}}
                                  alignItems={"center"} height={{lg: 40}} lg={11.5} xs={12}
                                  justifyContent={{lg: 'start', xs: 'center'}}>
                                <Typography fontSize={{lg: "30px"}} ml={{lg: 1}} color={colors.black.main}
                                            alignItems={{lg: "center"}} variant={"h1"}>ورود به حساب
                                    کاربری</Typography>
                            </Grid>
                            {!showVerify &&
                                <>
                                    <form onSubmit={formik.handleSubmit}>
                                        <Grid item container justifyContent={{lg: "space-evenly", xs: 'start'}}
                                              display={{xs: 'none', md: 'flex'}} lg={12}>
                                            <FormControl
                                                sx={{m: 1, width: {lg: 250, xs: '100%', md: "100%"}, marginTop: 3}}>
                                            </FormControl>
                                            <FormControl
                                                sx={{m: 1, width: {lg: 250, xs: '100%', md: "100%"}, marginTop: 3}}>
                                            </FormControl>
                                        </Grid>
                                        <Grid item container justifyContent={"start"} lg={12}>
                                            <FormControl sx={{m: 1, width: "100%",}}>
                                                <MInput
                                                    popup
                                                    id="phone"
                                                    name="phone"
                                                    type={'text'}
                                                    label={"کدملی"}
                                                    value={formik.values.phone}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                                    helperText={formik.touched.phone && formik.errors.phone}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item container justifyContent={"start"} lg={12}>
                                            <FormControl sx={{m: 1, width: "100%", marginTop: 3}} variant="outlined">
                                                <MInput
                                                    popup
                                                    id="pass"
                                                    name="pass"
                                                    label={"رمز عبور"}
                                                    value={formik.values.pass}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.touched.pass && Boolean(formik.errors.pass)}
                                                    helperText={formik.touched.pass && formik.errors.pass}
                                                    type={showPassword ? 'text' : 'password'}
                                                />
                                                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </FormControl>
                                        </Grid>
                                        <Grid item container lg={11.5} justifyContent={'space-between'} alignItems={'center'}>
                                            <Typography  ml={{lg: 1}} color={colors.black.main} alignItems={{lg: "center"}} variant={'caption'}>رمز خود را فراموش کرده ام؟</Typography>
                                            <Typography color={colors.black.main} variant="caption">
                                            بازیابی رمز عبور</Typography>
                                        </Grid>
                                        <Grid item container justifyContent={"center"} marginTop={{lg: 3, xs: 3, md: 5}}
                                              lg={12} md={12}>
                                            <MTButton register type="submit">ورود</MTButton>
                                        </Grid>
                                        <Grid item container justifyContent={"center"} marginTop={{lg: 3, xs: 3, md: 5}}
                                              lg={12} md={12}>
                                            <Link href={'/signup'}>
                                                <Typography color={colors.black.main} variant="caption">من هنوز ثبت نام نکرده
                                                    ام؟ <span  style={{
                                                        color: `${colors.blue.main}`,
                                                        fontSize: '14px',
                                                        cursor: 'pointer'
                                                    }}>صفحه ثبت نام</span></Typography>
                                            </Link>

                                        </Grid>
                                    </form>
                                </>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/* <Grid item container height={"100%"} alignItems={"center"}
                justifyContent={{ lg: 'center', md: 'center', xs: 'center' }} lg={6} md={6} sm={6}
                display={{ xs: 'flex', md: 'flex', lg: 'flex', sm: 'flex' }}
            ><img src={Images}
                width="100%"
                height="100%"
                alt="images" /></Grid> */}
            <Grid item container height={"100%"} alignItems={"center"}
                // position={{ xs: 'absolute' }}
                  justifyContent={{lg: 'center', md: 'center', xs: 'center'}} lg={6} md={6} sm={6}
                  display={{xs: 'flex', md: 'flex', lg: 'flex', sm: 'flex'}}
            ><Image src={Myimg}  alt="images"/></Grid>
            <Snackbar open={openMessage} autoHideDuration={6000} onClose={handleClose}>
                <Alert  sx={{width: '100%'}}>
                    <Typography variant={'caption'}>{message}</Typography>
                </Alert>
            </Snackbar>
        </Grid>
        </DashboardLayout>
    )
}
export default SignInPage
