// import {Grid, Typography, Button, IconButton} from "@mui/material";
// import colors from "../../Assets/theme/base/colors";
// import FormControl from '@mui/material/FormControl';
// import * as yup from 'yup';
// import {useFormik} from 'formik';
// import axios from 'axios';
// import React from "react";
// import Slide from '@mui/material/Slide';
// import Alert from "@mui/material/Alert";
// import Snackbar from '@mui/material/Snackbar';
// import MInput from "../../Components/Minput";
// import MTButton from "../../Components/Mbutton";
// import Myimg from '@/Assets/images/Rectangle.png';
// import Image from "next/image";
// import DashboardLayout from "../../Components/Dashboard/Layout";
// import Link from "next/link";
//
// const formValidationSchema = yup.object({
//     fname: yup.string().required('نام  الزامی است'),
//     lname: yup.string().required('نام خانوادگی الزامی است'),
//     phone: yup.string().required('شماره موبایل الزامی است'),
//     pass: yup.string().required('رمزعبور الزامی است').matches(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
//         "پسورد شما باید حتما از حروف بزرگ و کوچیک و عدد استفاده کنید"
//     ),
//     confirmPass: yup.string().required('تکرار رمزعبور الزامی است').oneOf([yup.ref('pass'), null], 'پسورد و تکرار آن باهم یکی نیستن!'),
// });
//
// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });
//
// const SignupPage = () => {
//     const [open, setOpen] = React.useState(false);
//     const [checked, setChecked] = React.useState([true, false]);
//     const [message, setMessage] = React.useState('')
//     const [openMessage, setOpenMessage] = React.useState(false);
//     const [typeMessage, setTypeMessage] = React.useState('')
//
//
//     // show password
//     const [showPassword, setShowPassword] = React.useState(false);
//     const handleClickShowPassword = () => setShowPassword((show) => !show);
//     const handleMouseDownPassword = (event) => {
//         event.preventDefault();
//     };
//
//     const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
//     const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
//     const handleMouseDownConfirmPassword = (event) => {
//         event.preventDefault();
//     };
//
//
//     const handleClickOpen = () => {
//         setOpen(true);
//     };
//
//     const handleClose = () => {
//         setOpen(false);
//     };
//
//     const handleChange3 = (event) => {
//         setChecked([checked[0], event.target.checked]);
//     };
//
//
//     const formik = useFormik({
//         initialValues: {
//             fname: '',
//             lname: '',
//             phone: '',
//             pass: '',
//             confirmPass: '',
//         },
//         validationSchema: formValidationSchema,
//         onSubmit: (values) => {
//             const Register = async () => {
//                 const config = {
//                     headers: {
//                         'Content-type': 'application/json',
//                     }
//                 }
//                 try {
//                     const response = await axios.post(`/user/create_user/`,
//                         {
//                             username: values.phone,
//                             first_name: values.fname,
//                             last_name: values.lname,
//                             phone_number: values.phone,
//                             password: values.pass,
//                             birth_date: "1381/02/04",
//                             address: "آدرس",
//                             description: "توضیحات",
//                             sabeghe_kar: "سابقه کار"
//                         },
//                         config
//                     )
//                     if (response.status === 201) {
//                         setTypeMessage('success')
//                         setMessage('با موفقیت حساب شما ایجاد شد')
//                         setOpenMessage(true)
//                         setTimeout(() => {
//                             navigate('/signin')
//                         }, 2000)
//                     }
//                 } catch (error) {
//                     setTypeMessage('error')
//                     setOpenMessage(true)
//                     setMessage(error.response.data.message)
//                 }
//             }
//             Register();
//         },
//     });
//
//     return (
//             <Grid container sx={{backgroundSize: {xs: 'cover', md: "cover", lg: 'cover'}}}
//                   height={{lg: "90vh", md: '105vh'}} flexDirection={{md: 'column-reverse', xs: 'column-reverse'}}
//                   justifyContent={"center"} alignItems={"center"} lg={12} md={12}>
//                 <Grid item container height={"100%"} mt={{lg: 5}} alignItems={"center"} justifyContent={"center"} lg={6}
//                       md={6} xs={12}>
//                     <Grid item container md={10} lg={10} marginTop={{lg: 2}}>
//                         <Grid item container md={10} lg={10} justifyContent={"center"}>
//                             <Grid item container borderLeft={{lg: 3, md: 0}} borderColor={{lg: '#D6C109'}}
//                                   alignItems={"center"} height={{lg: 40}} lg={11.5} xs={12}
//                                   justifyContent={{lg: 'start', xs: 'center'}}>
//                                 <Typography fontSize={{lg: "30px"}} ml={{lg: 1}} color={colors.black.main}
//                                             alignItems={{lg: "center"}}
//                                             variant={{lg: "h1"}}>ایجاد حساب کاربری</Typography>
//                             </Grid>
//                             <form onSubmit={formik.handleSubmit}>
//                                 <Grid item container justifyContent={{lg: "space-evenly", xs: 'start'}} lg={12}>
//                                     <FormControl sx={{m: 0, width: {lg: 245, xs: '100%', md: "100%",}, marginTop: 3}}>
//                                         <MInput
//                                             popup
//                                             id="fname"
//                                             name="fname"
//                                             label={"نام"}
//                                             value={formik.values.fname}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             error={formik.touched.fname && Boolean(formik.errors.fname)}
//                                             helperText={formik.touched.fname && formik.errors.fname}
//                                         />
//                                     </FormControl>
//                                     <FormControl sx={{ml: {lg: 1}, width: {lg: 245, xs: '100%', md: "100%"}, marginTop: 3}}>
//                                         <MInput
//                                             popup
//                                             id="lname"
//                                             name="lname"
//                                             label={" نام خانوادگی "}
//                                             value={formik.values.lname}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             error={formik.touched.lname && Boolean(formik.errors.lname)}
//                                             helperText={formik.touched.lname && formik.errors.lname}
//                                         />
//                                     </FormControl>
//                                 </Grid>
//
//                                 <Grid item container justifyContent={{lg: "space-evenly", xs: 'start'}} lg={12}>
//                                     <FormControl sx={{m: 0, width: {lg: 245, xs: '100%', md: "100%",}, marginTop: 3}}>
//                                         <MInput
//                                             popup
//                                             id="fname"
//                                             name="fname"
//                                             label={"نام پدر"}
//                                             value={formik.values.fname}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             error={formik.touched.fname && Boolean(formik.errors.fname)}
//                                             helperText={formik.touched.fname && formik.errors.fname}
//                                         />
//                                     </FormControl>
//                                     <FormControl sx={{ml: {lg: 1}, width: {lg: 245, xs: '100%', md: "100%"}, marginTop: 3}}>
//                                         <MInput
//                                             popup
//                                             id="lname"
//                                             name="lname"
//                                             label={"شماره تماس "}
//                                             value={formik.values.lname}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             error={formik.touched.lname && Boolean(formik.errors.lname)}
//                                             helperText={formik.touched.lname && formik.errors.lname}
//                                         />
//                                     </FormControl>
//                                 </Grid>
//
//                                 <Grid item container justifyContent={{lg: "space-evenly", xs: 'start'}} lg={12}>
//                                     <FormControl sx={{m: 0, width: {lg: 245, xs: '100%', md: "100%",}, marginTop: 3}}>
//                                         <MInput
//                                             popup
//                                             id="fname"
//                                             name="fname"
//                                             label={"شماره تماس"}
//                                             value={formik.values.fname}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             error={formik.touched.fname && Boolean(formik.errors.fname)}
//                                             helperText={formik.touched.fname && formik.errors.fname}
//                                         />
//                                     </FormControl>
//                                     <FormControl sx={{ml: {lg: 1}, width: {lg: 245, xs: '100%', md: "100%"}, marginTop: 3}}>
//                                         <MInput
//                                             popup
//                                             id="lname"
//                                             name="lname"
//                                             label={"کد ملی"}
//                                             value={formik.values.lname}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             error={formik.touched.lname && Boolean(formik.errors.lname)}
//                                             helperText={formik.touched.lname && formik.errors.lname}
//                                         />
//                                     </FormControl>
//                                 </Grid>
//
//                                 <Grid item container justifyContent={{lg: "space-evenly", xs: 'start'}} lg={12}>
//                                     <FormControl sx={{m: 0, width: {lg: 245, xs: '100%', md: "100%",}, marginTop: 3}}>
//                                         <MInput
//                                             popup
//                                             id="pass"
//                                             name="pass"
//                                             label={"رمز عبور"}
//                                             value={formik.values.pass}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             error={formik.touched.pass && Boolean(formik.errors.pass)}
//                                             helperText={formik.touched.pass && formik.errors.pass}
//                                             type={showPassword ? 'text' : 'password'}
//                                         />
//                                     </FormControl>
//                                     <FormControl sx={{ml: {lg: 1}, width: {lg: 245, xs: '100%', md: "100%"}, marginTop: 3}}>
//                                         <MInput
//                                             popup
//                                             id="pass"
//                                             name="pass"
//                                             label={"رمز عبور"}
//                                             value={formik.values.pass}
//                                             onChange={formik.handleChange}
//                                             onBlur={formik.handleBlur}
//                                             error={formik.touched.pass && Boolean(formik.errors.pass)}
//                                             helperText={formik.touched.pass && formik.errors.pass}
//                                             type={showPassword ? 'text' : 'password'}
//                                         />
//                                     </FormControl>
//                                 </Grid>
//
//                                 <Grid item container justifyContent={"center"} marginTop={{lg: 3, xs: 3, md: 5}} lg={12}
//                                       md={12}>
//                                     <MTButton  register type="submit">ثبت نام</MTButton>
//                                 </Grid>
//                                 <Grid item container justifyContent={"center"} marginTop={{lg: 3, xs: 3, md: 5}} lg={12}
//                                       md={12}>
//                                     <Link href={'/login'}>
//                                     <Typography color={colors.black.main} variant="caption">من قبلا ثبت نام کرده ام؟ <span
//                                         style={{color: `${colors.yellow.main}`, fontSize: '14px', cursor: 'pointer'}}>صفحه ورود</span></Typography>
//                                     </Link>
//                                 </Grid>
//                             </form>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid item container height={"100%"} alignItems={"center"}
//                     // position={{ xs: 'absolute' }}
//                       justifyContent={{lg: 'center', md: 'center', xs: 'center'}} lg={6} md={6} sm={6}
//                       display={{xs: 'flex', md: 'flex', lg: 'flex', sm: 'flex'}}
//                 >
//                     <Image src={Myimg}  alt="images"/>
//                 </Grid>
//                 <Snackbar open={openMessage} autoHideDuration={6000} onClose={handleClose}>
//                     <Alert onClose={handleClose} severity={typeMessage} sx={{width: '100%'}}>
//                         <Typography variant={'caption'}>{message}</Typography>
//                     </Alert>
//                 </Snackbar>
//             </Grid>
//     )
// }
// export default SignupPage
//
//




// // import next from 'next';
// // import {useFormik} from 'formik';
// // import {Alert, Box, Grid, Snackbar, Typography} from '@mui/material';
// // import {useEffect, useState} from 'react';
// // import * as yup from 'yup';
// // import MInput from '@/Components/Minput';
// // import MTButton from '@/Components/Mbutton';
// // import Image from 'next/image'
// // import axios from 'axios'
// // import logo from '@/Assets/images/computer-security-with-login-password-padlock (1) 1.png'
// // import BirkarSeystem from '@/Assets/images/Artboard 1 (3) 1 (1).png'
// // import React from 'react';
// // import {Theme, useTheme} from '@emotion/react';
// //
// // import MBox from "@/Components/MBox";
// //
// // const background = require("../../Assets/images/5066999 2.png")
// //
// // const formValidationSchema = yup.object({
// //     userName: yup.string().required('عنوان الزامی است'),
// //     password: yup.string().required('پسورد الزامی است')
// //         .min(5, 'پسورد باید حداکثر 8 حرف باشد')
// // });
// //
// // const Index = () => {
// //     const theme = useTheme() as Theme;
// //     const formik = useFormik({
// //         initialValues: {
// //             userName: '',
// //             password: '',
// //         },
// //         validationSchema: formValidationSchema,
// //         onSubmit: (values) => {
// //         }
// //     });
// //     return (
// //         <MBox backgroundImage backUrl={require("../../Assets/images/3d-smartphone.svg").default.src}>
// //             <Grid item container justifyContent={'start'} alignItems={'center'} height={'100vh'}>
// //                 <Grid item container lg={3.5} bgcolor={'white.main'} boxShadow={5} ml={{lg:5}} justifyContent={'center'}  sm={12} md={10}  height={'90vh'} borderRadius={'1rem'}>
// //                     <Grid item container justifyContent={'center'} bgcolor={'blue.main'} alignItems={'center'} lg={6} md={6} sm={6} p={2} flexDirection={"column"}>
// //                         <Grid item container justifyContent={'center'} alignItems={'center'}>
// //                             <Image src={logo} alt="Website logo" width={300} height={250}/>
// //                         </Grid>
// //                         <Grid item container justifyContent={'center'} p={2} alignItems={"end"}>
// //                             <form onSubmit={formik.handleSubmit}>
// //                                 <Grid item container justifyContent={'center'} alignItems={'center'}>
// //                                     <MInput
// //                                         popup
// //                                         id="userName"
// //                                         name="userName"
// //                                         label="نام کاربری"
// //                                         value={formik.values.userName}
// //                                         onChange={formik.handleChange}
// //                                         onBlur={formik.handleBlur}
// //                                         error={formik.touched.userName && Boolean(formik.errors.userName)}
// //                                         helperText={formik.touched.userName && formik.errors.userName}
// //                                     />
// //                                 </Grid>
// //                                 <Grid item container justifyContent={'center'} alignItems={'center'}
// //                                       marginTop={{xs: 2, lg: 4}}>
// //                                     <MInput
// //                                         popup
// //                                         id="password"
// //                                         name="password"
// //                                         label="رمز عبور"
// //                                         type="password"
// //                                         value={formik.values.password}
// //                                         onChange={formik.handleChange}
// //                                         onBlur={formik.handleBlur}
// //                                         error={formik.touched.password && Boolean(formik.errors.password)}
// //                                         helperText={formik.touched.password && formik.errors.password}
// //                                     />
// //                                 </Grid>
// //                                 <Grid item container justifyContent={'center'} alignItems={'center'} marginTop={4}>
// //                                     <MTButton color="primary" variant="contained" login type="submit">
// //                                         ورود
// //                                     </MTButton>
// //                                 </Grid>
// //                             </form>
// //                         </Grid>
// //                     </Grid>
// //                 </Grid>
// //             </Grid>
// //         </MBox>
// //
// //     )
// // }
// // export default Index
//
// import React from "react";
// import {Grid, Typography, IconButton} from "@mui/material";
// import {useFormik} from 'formik';
// import * as yup from 'yup';
// import axios from 'axios';
// import colors from "@/Assets/theme/base/colors";
// import Myimg from '@/Assets/images/Login/shop-online-internet-shopping-store-concept.jpg';
// import FormControl from '@mui/material/FormControl';
// import MTButton from "@/Components/Mbutton";
// import InputAdornment from '@mui/material/InputAdornment';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import Alert from "@mui/material/Alert";
// import Snackbar from '@mui/material/Snackbar';
// import MInput from "@/Components/Minput";
//
//
// const formValidationSchema = yup.object({
//     phone: yup.string().required('شماره موبایل الزامی است'),
//     pass: yup.string().required('رمزعبور الزامی است'),
// });
//
// import Image from 'next/image'
// import DashboardLayout from "@/Components/Dashboard/Layout";
// import Link from "next/link";
// import {useCookies} from "react-cookie";
// import { useRouter } from "next/router";
// import MBox from "@/Components/MBox";
//
// const SignInPage = () => {
//     const [openMessage, setOpenMessage] = React.useState(false);
//     const [typeMessage, setTypeMessage] = React.useState('')
//     const [message, setMessage] = React.useState('')
//     const [showPassword, setShowPassword] = React.useState(false);
//     const [Cookiess, SetCookies] = useCookies(['TokenLogin'])
//
//     const handleClickShowPassword = () => setShowPassword((show) => !show);
//     const handleMouseDownPassword = (event:any) => {
//         event.preventDefault();
//     };
//
//     const handleClose = (event:any, reason:any) => {
//         setOpenMessage(false);
//     };
//     const router = useRouter();
//
//     const formik = useFormik({
//         initialValues: {
//             phone: '',
//             pass: '',
//         },
//         validationSchema: formValidationSchema,
//         onSubmit: (values) => {
//             const login = async () => {
//                 const config = {
//                     headers: {
//                         'Content-type': 'application/json',
//                     }
//                 }
//                 try {
//                     const response = await axios.post(`https://farhangian.birkar.ir/api/User/Login`,
//                         {
//                             nationalCode: values.phone,
//                             password: values.pass,
//                         },
//                         config
//                     )
//                     if (response.status === 200) {
//                         SetCookies('TokenLogin' , response.data.data.token)
//                         setMessage('با موفقیت وارد شوید')
//                         setTypeMessage('success')
//                         setOpenMessage(true)
//                         router.push('/')
//                     }
//                 } catch (error:any) {
//                     setTypeMessage('error')
//                     setOpenMessage(true)
//                     setMessage(error.message)
//                 }
//             }
//             login();
//         },
//     });
//
//
//     return (
//         <MBox backgroundImage  backUrl={require("../../Assets/images/Login/shop-online-internet-shopping-store-concept.jpg").default.src}>
//
//         <Grid container  justifyContent={"center"} alignItems={"center"} lg={12} md={12}>
//             <Grid item container  alignItems={"center"} justifyContent={"center"} lg={6} md={6} xs={6}>
//                 <Grid item container md={10}  justifyContent={'center'} marginTop={{lg: 2}}>
//                     <Grid item container md={10}  justifyContent={"center"} marginTop={{lg: 2}}>
//                         <Grid item container md={10} justifyContent={"center"}>
//                             <Grid item container borderLeft={{lg: 3, md: 0}} borderColor={{lg: '#D6C109'}}
//                                   alignItems={"center"} height={{lg: 40}} lg={11.5} xs={12}
//                                   justifyContent={{lg: 'start', xs: 'center'}}>
//                                 <Typography fontSize={{lg: "30px"}} ml={{lg: 1}} color={colors.black.main} alignItems={{lg: "center"}} variant={"h1"}>ورود به حساب کاربری</Typography>
//                             </Grid>
//                                 <>
//                                     <form onSubmit={formik.handleSubmit}>
//                                         <Grid item container justifyContent={{lg: "space-evenly", xs: 'start'}}
//                                               display={{xs: 'none', md: 'flex'}} lg={12}>
//                                             <FormControl
//                                                 sx={{m: 1, width: {lg: 250, xs: '100%', md: "100%"}, marginTop: 3}}>
//                                             </FormControl>
//                                             <FormControl
//                                                 sx={{m: 1, width: {lg: 250, xs: '100%', md: "100%"}, marginTop: 3}}>
//                                             </FormControl>
//                                         </Grid>
//                                         <Grid item container justifyContent={"start"} lg={12}>
//                                             <FormControl sx={{m: 1, width: "100%",}}>
//                                                 <MInput
//                                                     popup
//                                                     id="phone"
//                                                     name="phone"
//                                                     type={'text'}
//                                                     label={"کدملی"}
//                                                     value={formik.values.phone}
//                                                     onChange={formik.handleChange}
//                                                     onBlur={formik.handleBlur}
//                                                     error={formik.touched.phone && Boolean(formik.errors.phone)}
//                                                     helperText={formik.touched.phone && formik.errors.phone}
//                                                 />
//                                             </FormControl>
//                                         </Grid>
//                                         <Grid item container justifyContent={"start"} lg={12}>
//                                             <FormControl sx={{m: 1, width: "100%", marginTop: 3}} variant="outlined">
//                                                 <MInput
//                                                     popup
//                                                     id="pass"
//                                                     name="pass"
//                                                     label={"رمز عبور"}
//                                                     value={formik.values.pass}
//                                                     onChange={formik.handleChange}
//                                                     onBlur={formik.handleBlur}
//                                                     error={formik.touched.pass && Boolean(formik.errors.pass)}
//                                                     helperText={formik.touched.pass && formik.errors.pass}
//                                                     type={showPassword ? 'text' : 'password'}
//                                                 />
//                                                 <InputAdornment sx={{ width: '97%', top: { lg: 30, xs: 30 }, position: 'absolute', display: 'flex', justifyContent: 'end' }}>
//                                                     <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
//                                                         {showPassword ? <VisibilityOff/> : <Visibility/>}
//                                                     </IconButton>
//                                                 </InputAdornment>
//                                             </FormControl>
//                                         </Grid>
//                                         <Grid item container lg={11.5} justifyContent={'space-between'} alignItems={'center'}>
//                                             <Typography  ml={{lg: 1}} color={colors.black.main} alignItems={{lg: "center"}} variant={'caption'}>رمز خود را فراموش کرده ام؟</Typography>
//                                             <Typography color={colors.black.main} variant="caption">
//                                             بازیابی رمز عبور</Typography>
//                                         </Grid>
//                                         <Grid item container justifyContent={"center"} marginTop={{lg: 3, xs: 3, md: 5}}
//                                               lg={12} md={12}>
//                                             <MTButton register type="submit">ورود</MTButton>
//                                         </Grid>
//                                         <Grid item container justifyContent={"center"} marginTop={{lg: 3, xs: 3, md: 5}}
//                                               lg={12} md={12}>
//                                             <Link href={'/signup'}>
//                                                 <Typography color={colors.black.main} variant="caption">من هنوز ثبت نام نکرده
//                                                     ام؟ <span  style={{
//                                                         color: `${colors.blue.main}`,
//                                                         fontSize: '14px',
//                                                         cursor: 'pointer'
//                                                     }}>صفحه ثبت نام</span></Typography>
//                                             </Link>
//
//                                         </Grid>
//                                     </form>
//                                 </>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//             {/* <Grid item container height={"100%"} alignItems={"center"}
//                 justifyContent={{ lg: 'center', md: 'center', xs: 'center' }} lg={6} md={6} sm={6}
//                 display={{ xs: 'flex', md: 'flex', lg: 'flex', sm: 'flex' }}
//             ><img src={Images}
//                 width="100%"
//                 height="100%"
//                 alt="images" /></Grid> */}
//             <Grid item container height={"100%"} alignItems={"center"} justifyContent={{lg: 'center', md: 'center', xs: 'center'}} lg={6} md={6} sm={6} display={{xs: 'flex', md: 'flex', lg: 'flex', sm: 'flex'}}
//             ></Grid>
//             <Snackbar open={openMessage} autoHideDuration={6000} onClose={handleClose}>
//                 <Alert  sx={{width: '100%'}}>
//                     <Typography variant={'caption'}>{message}</Typography>
//                 </Alert>
//             </Snackbar>
//         </Grid>
//         </MBox>
//     )
// }
// export default SignInPage



import next from 'next';
import {useFormik} from 'formik';
import {Alert, AlertColor, Box, Grid, IconButton, InputAdornment, Snackbar, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import * as yup from 'yup';
import MInput from '@/Components/Minput';
import MTButton from '@/Components/Mbutton';
import Image from 'next/image'
import axios from 'axios'
import logo from '@/Assets/images/HamedanLogo 1.webp'
import BirkarSeystem from '@/Assets/images/Artboard 1 (3) 1 (1).png'
import React from 'react';
import {Theme, useTheme} from '@emotion/react';

import MBox from "@/Components/MBox";
import FormControl from "@mui/material/FormControl";
import {useCookies} from "react-cookie";
import {useRouter} from "next/router";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import colors from "@/Assets/theme/base/colors";
import Link from "next/link";

const background = require("../../Assets/images/5066999 2.png")

const formValidationSchema = yup.object({
    fname: yup.string().required('نام  الزامی است'),
    lname: yup.string().required('نام خانوادگی الزامی است'),
    birthdate:yup.string().required('تاریخ تولد الزامی است'),
    fatherName:yup.string().required('نام پدر الزامی است'),
    personCode:yup.string().required('کد اشخاص الزامی است'),
    nationalCode:yup.string().required(' کد ملی الزامی است'),
    phone: yup.string().required('شماره موبایل الزامی است'),
    pass: yup.string().required('رمزعبور الزامی است').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        "پسورد شما باید حتما از حروف بزرگ و کوچیک و عدد استفاده کنید"
    ),
});
const Login = () => {
    const [openMessage, setOpenMessage] = React.useState(false);
    const [typeMessage, setTypeMessage] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false);
    const [Cookiess, SetCookies] = useCookies(['TokenLogin'])

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event:any) => {
        event.preventDefault();
    };

    const handleCloseAlert = () => {
        setOpenMessage(false);
    };
    const handleClose = (event:any, reason:any) => {
        setOpenMessage(false);
    };
    const router = useRouter();

        const formik = useFormik({
        initialValues: {
            fname:'',
            lname:'',
            birthdate:'',
            fatherName:'',
            personCode:'',
            nationalCode:'',
            phone:'',
            pass:''
        },
        validationSchema: formValidationSchema,
        onSubmit: (values) => {
            const Register = async () => {
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
                try {
                    const response = await axios.post(`https://farhangian.birkar.ir/api/User/Register`,
                        {
                            personCode: values.personCode,
                            firstName: values.fname,
                            lastName: values.lname,
                            birthdate: values.birthdate,
                            fatherName: values.fatherName,
                            nationalCode: values.nationalCode,
                            phoneNumber: values.phone,
                            password: values.pass
                        },
                        config
                    )
                    if (response.status === 201) {
                        SetCookies('TokenLogin' , response.data.data.token)
                        setTypeMessage('success')
                        setMessage('با موفقیت حساب شما ایجاد شد')
                        setOpenMessage(true)
                        setTimeout(() => {
                            // navigate('/signin')
                            router.push('/')
                        }, 2000)
                    }
                } catch (error:any) {
                    setTypeMessage('error')
                    setOpenMessage(true)
                    setMessage(error.response.data.message)
                }
            }
            Register();
        },
    });


    return (
            <Grid item container justifyContent={'center'} alignItems={'center'}  bgcolor={'#eef1f2'} height={'100vh'} overflow={'auto'}>
                <Grid item container  sm={12} md={10} lg={12} height={'100vh'} >
                    <Grid item container justifyContent={'center'} alignItems={'center'} lg={6} md={6} sm={6} p={2} flexDirection={"column"}>
                        <Grid item container justifyContent={'center'} alignItems={'center'}>
                            <Image src={logo} alt="Website logo" width={250} height={180}/>
                        </Grid>
                        <Grid item container justifyContent={'center'}  p={2} alignItems={"end"}>
                            <form onSubmit={formik.handleSubmit}>
                                <Grid item container justifyContent={{lg: "space-evenly", xs: 'start'}} lg={12}>
                                    <FormControl sx={{m: 0, width: {lg: 245, xs: '100%', md: "100%",}, marginTop: 3}}>
                                        <MInput
                                            popup
                                            id="fname"
                                            name="fname"
                                            label={"نام"}
                                            value={formik.values.fname}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.fname && Boolean(formik.errors.fname)}
                                            helperText={formik.touched.fname && formik.errors.fname}
                                        />
                                    </FormControl>
                                    <FormControl sx={{ml: {lg: 1}, width: {lg: 245, xs: '100%', md: "100%"}, marginTop: 3}}>
                                        <MInput
                                            popup
                                            id="lname"
                                            name="lname"
                                            label={" نام خانوادگی "}
                                            value={formik.values.lname}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.lname && Boolean(formik.errors.lname)}
                                            helperText={formik.touched.lname && formik.errors.lname}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item container justifyContent={{lg: "space-evenly", xs: 'start'}} lg={12}>
                                    <FormControl sx={{m: 0, width: {lg: 245, xs: '100%', md: "100%",}, marginTop: 3}}>
                                        <MInput
                                            popup
                                            id="fatherName"
                                            name="fatherName"
                                            label={"نام پدر"}
                                            value={formik.values.fatherName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.fatherName && Boolean(formik.errors.fatherName)}
                                            helperText={formik.touched.fatherName && formik.errors.fatherName}
                                        />
                                    </FormControl>
                                    <FormControl sx={{ml: {lg: 1}, width: {lg: 245, xs: '100%', md: "100%"}, marginTop: 3}}>
                                        <MInput
                                            popup
                                            id="phone"
                                            name="phone"
                                            label={"شماره تماس "}
                                            value={formik.values.phone}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                                            helperText={formik.touched.phone && formik.errors.phone}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item container justifyContent={{lg: "space-evenly", xs: 'start'}} lg={12}>
                                    <FormControl sx={{m: 0, width: {lg: 245, xs: '100%', md: "100%",}, marginTop: 3}}>
                                        <MInput
                                            popup
                                            id="birthdate"
                                            name="birthdate"
                                            label={"تاریخ تولد"}
                                            value={formik.values.birthdate}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.birthdate && Boolean(formik.errors.birthdate)}
                                            helperText={formik.touched.birthdate && formik.errors.birthdate}
                                        />
                                    </FormControl>
                                    <FormControl sx={{ml: {lg: 1}, width: {lg: 245, xs: '100%', md: "100%"}, marginTop: 3}}>
                                        <MInput
                                            popup
                                            id="nationalCode"
                                            name="nationalCode"
                                            label={"کد ملی"}
                                            value={formik.values.nationalCode}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.nationalCode && Boolean(formik.errors.nationalCode)}
                                            helperText={formik.touched.nationalCode && formik.errors.nationalCode}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item container justifyContent={{lg: "space-evenly", xs: 'start'}} lg={12}>
                                    <FormControl sx={{m: 0, width: {lg: 245, xs: '100%', md: "100%",}, marginTop: 3}}>
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
                                    </FormControl>
                                    <FormControl sx={{ml: {lg: 1}, width: {lg: 245, xs: '100%', md: "100%"}, marginTop: 3}}>
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
                                    </FormControl>
                                </Grid>
                                <Grid item container justifyContent={{lg: "space-evenly", xs: 'start'}} lg={12}>
                                    <FormControl sx={{m: 0, width: {lg: 245, xs: '100%', md: "100%",}, marginTop: 3}}>
                                        <MInput
                                            popup
                                            id="personCode"
                                            name="personCode"
                                            label={"کد اشخاص "}
                                            value={formik.values.personCode}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.personCode && Boolean(formik.errors.personCode)}
                                            helperText={formik.touched.personCode && formik.errors.personCode}
                                            type={showPassword ? 'text' : 'password'}
                                        />
                                    </FormControl>

                                </Grid>

                                <Grid item container justifyContent={"center"} marginTop={{lg: 3, xs: 3, md: 5}} lg={12} md={12}>
                                    <MTButton  register type="submit">ثبت نام</MTButton>
                                </Grid>
                                <Grid item container justifyContent={"center"} marginTop={{lg: 3, xs: 3, md: 5}} lg={12}
                                      md={12}>
                                    <Link href={'/login'}>
                                        <Typography color={colors.black.main} variant="caption">من قبلا ثبت نام کرده ام؟ <span
                                            style={{color: `${colors.blue.main}`, fontSize: '14px', cursor: 'pointer'}}>صفحه ورود</span></Typography>
                                    </Link>

                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                    <Grid lg={6} md={6} sm={6} item container>
                        <MBox  width={"100%"} height={"100%"} backProp={"contain"} backgroundImage
                               backUrl={require("../../Assets/images/Login/cyber-monday-shopping-sales_23-2148688504.jpg").default.src}>
                            <Grid item container justifyContent={'end'} alignItems={'end'}
                                  flexDirection={"column"}>
                            </Grid>
                        </MBox>
                    </Grid>
                </Grid>
                <Snackbar open={openMessage} autoHideDuration={4500} anchorOrigin={{horizontal: 'left', vertical: 'bottom'}} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity={typeMessage as AlertColor} sx={{width: '100%'}}>
                        <Typography variant={'caption'}>{message}</Typography>
                    </Alert>
                </Snackbar>
            </Grid>

    )
}
export default Login

