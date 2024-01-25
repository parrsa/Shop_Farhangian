import next from 'next';
import { useFormik } from 'formik';
import { Alert, Grid, Snackbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import MInput from '@/Components/Minput';
import MTButton from '@/Components/Mbutton';
import Image from 'next/image'
import axios from 'axios'
import logo from '../../Assets/images/computer-security-with-login-password-padlock (1) 1.png'
import colors from '@/Assets/theme/base/colors';
import BirkarSeystem from '../../Assets/images/Artboard 1 (3) 1 (1).png'
import React from 'react';
import { Theme, useTheme } from '@emotion/react';

const formValidationSchema = yup.object({
    userName: yup.string().required('عنوان الزامی است'),
    password: yup.string().required('پسورد الزامی است')
        .min(5, 'پسورد باید حداکثر 8 حرف باشد')
});

const Login = () => {
    const theme = useTheme() as Theme;
    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        validationSchema: formValidationSchema,
        onSubmit: (values) => {

        },
    });
    return (
        <Grid container  height={"100vh"} sx={{ backgroundImage: `url(${logo})` }} justifyContent={"center"} alignItems={"center"} >
            <Grid item container lg={7} borderRadius={'2rem'} height={'80%'} bgcolor={'white.main'}>
                <Grid item container bgcolor={colors.white.main} lg={6} borderRadius={"1rem 0px 0px 1rem"} justifyContent={"start"} alignItems={'start'} flexDirection={"column"}>
                    <Grid item container justifyContent={"center"}>
                        <Image src={logo} alt="Website logo" width={300} height={250} />
                    </Grid>
                    <Grid item container justifyContent={"center"} height={{ lg: '30vh' }} alignItems={"end"}>
                        <form onSubmit={formik.handleSubmit} >
                            <Grid item container justifyContent={"center"} alignItems={"center"}>
                                <MInput
                                    popup
                                    id="userName"
                                    name="userName"
                                    label="نام کاربری"
                                    value={formik.values.userName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.userName && Boolean(formik.errors.userName)}
                                    helperText={formik.touched.userName && formik.errors.userName}
                                />
                            </Grid>
                            <Grid item container justifyContent={"center"} marginTop={{ xs: 2, lg: 4 }} alignItems={"center"}>
                                <MInput
                                    popup
                                    id="password"
                                    name="password"
                                    label="رمز عبور"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </Grid>
                            <Grid item container justifyContent={"center"} alignItems={"center"} marginTop={4} >
                                <MTButton color="primary" variant="contained" login type="submit">
                                    ورود
                                </MTButton>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
                <Grid item container lg={6} className='p' bgcolor={'grey.500'} borderRadius={"1rem 1rem 1rem 1rem"}  >
                    <Grid item container justifyContent={"start"} flexDirection={"column"} alignItems={"center"}>
                        <Grid item container lg={12} borderRadius={"1rem 1rem 1rem 1rem"} bgcolor={"white.main"} sx={{opacity:'0.5'}}>
                        </Grid>
                        <Grid item container position={'absolute'} justifyContent={"start"} flexDirection={"column"} alignItems={"center"}>
                            <Image src={BirkarSeystem} alt="Website logo" />
                            <Typography variant={'h4'}>بیرکار سیستم</Typography>
                            <Typography>داشبورد مدیریتی </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default Login
