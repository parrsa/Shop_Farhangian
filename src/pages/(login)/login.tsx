import next from 'next';
import {useFormik} from 'formik';
import {Alert, Box, Grid, Snackbar, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import * as yup from 'yup';
import MInput from '@/Components/Minput';
import MTButton from '@/Components/Mbutton';
import Image from 'next/image'
import axios from 'axios'
import logo from '@/Assets/images/computer-security-with-login-password-padlock (1) 1.png'
import BirkarSeystem from '@/Assets/images/Artboard 1 (3) 1 (1).png'
import React from 'react';
import {Theme, useTheme} from '@emotion/react';

import MBox from "@/Components/MBox";

const background = require("../../Assets/images/5066999 2.png")

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
        }
    });
    return (
        <MBox backgroundImage backUrl={require("../../Assets/images/3d-smartphone.svg").default.src}>
            <Grid item container justifyContent={'start'} alignItems={'center'} height={'100vh'}>
                <Grid item container lg={4} bgcolor={'red.500'} sm={12} md={10} borderRadius={'2.2rem'}>
                    <Grid item container justifyContent={'center'} alignItems={'center'} lg={6} md={6} sm={6} p={2}
                          flexDirection={"column"}>
                        <Grid item container justifyContent={'center'} alignItems={'center'}>
                            <Image src={logo} alt="Website logo" width={300} height={250}/>
                        </Grid>
                        <Grid item container justifyContent={'center'} p={2} alignItems={"end"}>
                            <form onSubmit={formik.handleSubmit}>
                                <Grid item container justifyContent={'center'} alignItems={'center'}>
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
                                <Grid item container justifyContent={'center'} alignItems={'center'}
                                      marginTop={{xs: 2, lg: 4}}>
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
                                <Grid item container justifyContent={'center'} alignItems={'center'} marginTop={4}>
                                    <MTButton color="primary" variant="contained" login type="submit">
                                        ورود
                                    </MTButton>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </MBox>

    )
}
export default Login
