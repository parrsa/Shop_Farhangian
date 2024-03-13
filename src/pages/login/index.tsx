import next from 'next';
import {useFormik} from 'formik';
import {
    Alert,
    AlertColor,
    Box, Drawer,
    Grid,
    IconButton,
    InputAdornment, InputLabel,
    List,
    Modal,
    Snackbar, Stack, TextField,
    Typography
} from '@mui/material';
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
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import ClearIcon from "@mui/icons-material/Clear";

const background = require("../../Assets/images/5066999 2.png")

const formValidationSchema = yup.object({
    phone: yup.string().required('نام کاربری الزامی است'),
    pass: yup.string().required('رمزعبور الزامی است'),
});

const formValidationSchemas = yup.object({
    NowPassword: yup.string().required('نام کاربری الزامی است'),
    NewPassword: yup.string().required('رمزعبور الزامی است'),
    ConfirmPassword: yup.string().required('تکرار رمزعبور الزامی است').oneOf([yup.ref('NewPassword')], 'پسورد و تکرار آن باهم یکی نیستن!'),
});

const style = {
    position: 'absolute' as 'absolute',
    textAlign: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {lg: 500, xs: 400},
    bgcolor: 'background.paper',
    color: 'red.main',
    border: 'none',
    outline: 'none',
    borderRadius: 2,
    boxShadow: 24,
};
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

const Login = () => {
    const [openMessage, setOpenMessage] = React.useState(false);
    const [typeMessage, setTypeMessage] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false);
    const [Cookiess, SetCookies] = useCookies<any>(['TokenLogin'])
    const [TokenChangePass, setTokenChangePass] = React.useState<any>()
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [open, setOpen] = React.useState(false);
    const [openEditePassword, setOpenEditePassword] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleCloses = () => setOpen(false);

    const handleOpenEditePassword = () => setOpen(true);
    const handleCloseEditePassword = () => setOpenEditePassword(false);

    React.useEffect(() => {
        setOpen(true)
    }, [])

    const handleCloseAlert = () => {
        setOpenMessage(false);
    };
    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    const handleClose = (event: any, reason: any) => {
        setOpenMessage(false);
    };
    const router = useRouter();

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
                    const response = await axios.post(`https://farhangian.birkar.ir/api/User/Login`,
                        {
                            codePersonneli: values.phone,
                            password: values.pass,
                        },
                        config
                    )
                    if (response.status === 200) {
                        if (response.data.data.isChangePassword) {
                            SetCookies('TokenLogin', response.data.data.access_token)
                            SetCookies('Stamp', response.data.data.stamp)
                            setMessage('با موفقیت وارد شوید')
                            setTypeMessage('success')
                            setOpenMessage(true)
                            router.push('/')
                        } else {
                            setTokenChangePass(response.data.data.access_token)
                            setMessage('برای اولین بار باید پسورد خود را تغییر دهید')
                            setTypeMessage('warning')
                            setOpenMessage(true)
                            setTimeout(() => {
                                setOpenEditePassword(true)
                            }, 2000)
                        }
                    }
                } catch (error: any) {
                    setTypeMessage('error')
                    setOpenMessage(true)
                    setMessage(error.response.Message)
                }
            }
            login();
        },
    });
    const [showNowPassword, setShowNowPassword] = React.useState(false);
    const handleClickShowNowPassword = () => setShowNowPassword((show) => !show);

    const handleMouseDownNowPassword = (event: any) => {
        event.preventDefault();
    };

    const [showNewPassword, setShowNewPassword] = React.useState(false);

    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

    const handleMouseDownNewPassword = (event: any) => {
        event.preventDefault();
    };

    const [showConfirmNewPassword, setShowConfirmNewPassword] = React.useState(false);

    const handleClickShowConfirmNewPassword = () => setShowConfirmNewPassword((show) => !show);

    const handleMouseDownConfirmNewPassword = (event: any) => {
        event.preventDefault();
    };


    const formiks = useFormik({
        initialValues: {
            NowPassword: '',
            NewPassword: '',
            ConfirmPassword: ''
        },
        validationSchema: formValidationSchemas,
        onSubmit: (values) => {
            const Submite = async () => {
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${TokenChangePass}`,
                    },
                };

                try {
                    const response = await axios.put(
                        'https://farhangian.birkar.ir/api/User/UpdatePassword',
                        {
                            'oldPass': values.NowPassword,
                            'newPass': values.NewPassword,
                            'confirmPass': values.ConfirmPassword
                        },
                        config
                    );

                    if (response.status === 200) {
                        setMessage(' با موفقیت ادیت شد');
                        setTypeMessage('success');
                        setOpenMessage(true);
                        formiks.resetForm();
                        setOpen(false)
                        setOpenEditePassword(false)
                    }
                } catch (error: any) {
                    setTypeMessage('error');
                    setOpenMessage(true);
                    setMessage(error.response.data.Message)
                }
            };

            Submite();
        },
    });


    return (
        <Grid item container justifyContent={'center'} alignItems={'center'} height={'100vh'}>
            <Grid item container sm={12} md={10} lg={12} height={'100vh'} bgcolor={'#eef1f2'}>
                <Grid item container justifyContent={'center'} alignItems={'center'} lg={6} md={6} sm={6} p={2}
                      flexDirection={"column"}>
                    <Grid item container justifyContent={'center'} flexDirection={'column'} alignItems={'center'}>
                        <Image src={logo} alt="Website logo" width={200} height={200}/>
                        <Typography variant={'h4'} color={'blue.main'}>فروشگاه تعاونی مصرف کارکنان فرهنگیان</Typography>
                    </Grid>

                    <Grid item container justifyContent={'center'} p={2} alignItems={"end"}>
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
                            <Grid item container justifyContent={"center"} lg={12}>
                                <FormControl sx={{m: 1, width: "75%",}}>
                                    <MInput
                                        popup
                                        id="phone"
                                        name="phone"
                                        type={'text'}
                                        label={"نام کاربری"}
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                                        helperText={formik.touched.phone && formik.errors.phone}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item container justifyContent={"center"} lg={12}>
                                <FormControl sx={{m: 1, width: "75%", marginTop: 3}} variant="outlined">
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

                                    <InputAdornment position={"start"} sx={{
                                        width: '97%',
                                        top: {lg: 30, xs: 30},
                                        position: 'absolute',
                                        display: 'flex',
                                        justifyContent: 'end'
                                    }}>
                                        <IconButton aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword} edge="end">
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>

                                </FormControl>
                            </Grid>
                            <Grid item container justifyContent={"center"} marginTop={{lg: 3, xs: 3, md: 5}}
                                  lg={12} md={12}>
                                <MTButton register type="submit">ورود</MTButton>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
                <Grid lg={6} md={6} sm={6} item container>
                    <MBox width={"100%"} height={"100%"} backProp={"contain"} backgroundImage
                          backUrl={require("../../Assets/images/Login/cyber-monday-shopping-sales_23-2148688504.jpg").default.src}>
                        <Grid item container justifyContent={'end'} alignItems={'end'}
                              flexDirection={"column"}>
                        </Grid>
                    </MBox>
                </Grid>


                <Snackbar open={openMessage} autoHideDuration={4500}
                          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity={typeMessage as AlertColor} sx={{width: '100%'}}>
                        <Typography variant={'caption'}>{message}</Typography>
                    </Alert>
                </Snackbar>
            </Grid>
            <Modal
                open={open}
                onClose={handleCloses}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles}>
                    <Typography variant={'h5'}>توجه</Typography>
                    <Typography id="modal-modal-description">
                        نام کاربری و رمز عبور برای اولین بار کد پرسنلی شما میباشد
                    </Typography>
                </Box>
            </Modal>


            <Modal
                open={openEditePassword}
                onClose={handleCloseEditePassword}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>
                    <Box sx={style} width={{xs: 50}}>
                        <Grid item container lg={12} justifyContent={'center'} alignItems={'center'} p={2}>
                            <Typography variant={'h1'} color={'black.main'}>صفحه تغییر پسورد</Typography>
                        </Grid>
                        <hr style={{width: '100%', height: 2, backgroundColor: 'red.main'}}/>
                        <Grid item container lg={12} mt={{lg: 2}}>
                            <Grid item container m={0} mb={0} p={0} position={'relative'} lg={12} md={12} xs={12}
                                  sm={12}>
                                <List sx={{width: '100%'}}>
                                    <form onSubmit={formiks.handleSubmit} style={{width: '100%'}}>
                                        <Grid item container lg={12} p={2}>
                                            <FormControl fullWidth>
                                                <InputLabel sx={{
                                                    marginTop: "-25px",
                                                    fontFamily: 'Yekan Bakh Medium',
                                                    fontSize: "1.2rem",
                                                    fontWeight: "bold !important",
                                                    color: colors.black.main + "!important",

                                                }} shrink htmlFor="bootstrap-input">
                                                    رمز عبور فعلی  :
                                                </InputLabel>
                                                <MInput
                                                    popup
                                                    id="NowPassword"
                                                    name="NowPassword"
                                                    label={"رمز عبور"}
                                                    value={formiks.values.NowPassword}
                                                    onChange={formiks.handleChange}
                                                    onBlur={formiks.handleBlur}
                                                    error={formiks.touched.NowPassword && Boolean(formiks.errors.NowPassword)}
                                                    helperText={formiks.touched.NowPassword && formiks.errors.NowPassword}
                                                    type={showNowPassword ? 'text' : 'password'}
                                                />

                                                <InputAdornment position={"start"} sx={{
                                                    width: '97%',
                                                    top: {lg: 30, xs: 30},
                                                    position: 'absolute',
                                                    display: 'flex',
                                                    justifyContent: 'end'
                                                }}>
                                                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowNowPassword} onMouseDown={handleMouseDownNowPassword} edge="end">
                                                        {showNowPassword ? <VisibilityOff/> : <Visibility/>}
                                                    </IconButton>
                                                </InputAdornment>

                                            </FormControl>
                                        </Grid>


                                        <Grid item container lg={12} p={2} mt={{lg:2}}>
                                            <FormControl fullWidth>
                                                <InputLabel sx={{
                                                    marginTop: "-20px",
                                                    fontFamily: 'Yekan Bakh Medium',
                                                    fontSize: "1.2rem",
                                                    fontWeight: "bold !important",
                                                    color: colors.black.main + "!important",

                                                }} shrink htmlFor="bootstrap-input">
                                                    رمز عبور جدید :
                                                </InputLabel>
                                                <MInput
                                                    popup
                                                    id="NewPassword"
                                                    name="NewPassword"
                                                    value={formiks.values.NewPassword}
                                                    onChange={formiks.handleChange}
                                                    onBlur={formiks.handleBlur}
                                                    type={showNewPassword ? 'text' : 'password'}
                                                    error={formiks.touched.NewPassword && Boolean(formiks.errors.NewPassword)}
                                                    helperText={formiks.touched.NewPassword && formiks.errors.NewPassword}
                                                />

                                                <InputAdornment position={"start"} sx={{
                                                    width: '97%',
                                                    top: {lg: 30, xs: 30},
                                                    position: 'absolute',
                                                    display: 'flex',
                                                    justifyContent: 'end'
                                                }}>
                                                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowNewPassword} onMouseDown={handleMouseDownNewPassword} edge="end">
                                                        {showNewPassword ? <VisibilityOff/> : <Visibility/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            </FormControl>
                                        </Grid>


                                        <Grid item container lg={12} p={2} mt={{lg:2}}>
                                            <FormControl fullWidth>
                                                <InputLabel sx={{
                                                    marginTop: "-20px",
                                                    fontFamily: 'Yekan Bakh Medium',
                                                    fontSize: "1.2rem",
                                                    fontWeight: "bold !important",
                                                    color: colors.black.main + "!important",

                                                }} shrink htmlFor="bootstrap-input">
                                                    تکرار عبور جدید :
                                                </InputLabel>
                                                <MInput
                                                    popup
                                                    id="ConfirmPassword"
                                                    name="ConfirmPassword"
                                                    type={showConfirmNewPassword ? 'text' : 'password'}
                                                    value={formiks.values.ConfirmPassword}
                                                    onChange={formiks.handleChange}
                                                    onBlur={formiks.handleBlur}
                                                    error={formiks.touched.ConfirmPassword && Boolean(formiks.errors.ConfirmPassword)}
                                                    helperText={formiks.touched.ConfirmPassword && formiks.errors.ConfirmPassword}
                                                />

                                                <InputAdornment position={"start"} sx={{
                                                    width: '97%',
                                                    top: {lg: 30, xs: 30},
                                                    position: 'absolute',
                                                    display: 'flex',
                                                    justifyContent: 'end'
                                                }}>
                                                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowConfirmNewPassword} onMouseDown={handleMouseDownConfirmNewPassword} edge="end">
                                                        {showConfirmNewPassword ? <VisibilityOff/> : <Visibility/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            </FormControl>
                                        </Grid>

                                        <Grid item container lg={12} justifyContent={'center'} p={2}>
                                            <MTButton submite type="submit">تغییر رمز عبور</MTButton>
                                        </Grid>
                                    </form>
                                </List>
                            </Grid>
                        </Grid>
                    </Box>
                </>
            </Modal>
        </Grid>
    )
}
export default Login

