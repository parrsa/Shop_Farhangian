import {Grid, Typography, Button, IconButton} from "@mui/material";
import colors from "../../Assets/theme/base/colors";
import Images from '../../Assets/images/Rectangle.png';
import FormControl from '@mui/material/FormControl';
import * as yup from 'yup';
import {useFormik} from 'formik';
import axios from 'axios';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {useNavigate} from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';
import MInput from "../../Components/Minput";
import MTButton from "../../Components/Mbutton";
import Myimg from '@/Assets/images/Rectangle.png';
import Image from "next/image";
import {Dashboard} from "@mui/icons-material";
import DashboardLayout from "../../Components/Dashboard/Layout";

const formValidationSchema = yup.object({
    fname: yup.string().required('نام  الزامی است'),
    lname: yup.string().required('نام خانوادگی الزامی است'),
    phone: yup.string().required('شماره موبایل الزامی است'),
    pass: yup.string().required('رمزعبور الزامی است').matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        "پسورد شما باید حتما از حروف بزرگ و کوچیک و عدد استفاده کنید"
    ),
    confirmPass: yup.string().required('تکرار رمزعبور الزامی است').oneOf([yup.ref('pass'), null], 'پسورد و تکرار آن باهم یکی نیستن!'),
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const SignupPage = () => {
    const [open, setOpen] = React.useState(false);
    // const navigate = useNavigate()
    const [checked, setChecked] = React.useState([true, false]);
    const [message, setMessage] = React.useState('')
    const [openMessage, setOpenMessage] = React.useState(false);
    const [typeMessage, setTypeMessage] = React.useState('')


    // show password
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange3 = (event) => {
        setChecked([checked[0], event.target.checked]);
    };


    const formik = useFormik({
        initialValues: {
            fname: '',
            lname: '',
            phone: '',
            pass: '',
            confirmPass: '',
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
                    const response = await axios.post(`/user/create_user/`,
                        {
                            username: values.phone,
                            first_name: values.fname,
                            last_name: values.lname,
                            phone_number: values.phone,
                            password: values.pass,
                            birth_date: "1381/02/04",
                            address: "آدرس",
                            description: "توضیحات",
                            sabeghe_kar: "سابقه کار"
                        },
                        config
                    )
                    if (response.status === 201) {
                        setTypeMessage('success')
                        setMessage('با موفقیت حساب شما ایجاد شد')
                        setOpenMessage(true)
                        setTimeout(() => {
                            navigate('/signin')
                        }, 2000)
                    }
                } catch (error) {
                    setTypeMessage('error')
                    setOpenMessage(true)
                    setMessage(error.response.data.message)
                }
            }
            Register();
        },
    });

    return (
        <DashboardLayout>
            <Grid container sx={{backgroundSize: {xs: 'cover', md: "cover", lg: 'cover'}}}
                  height={{lg: "90vh", md: '105vh'}} flexDirection={{md: 'column-reverse', xs: 'column-reverse'}}
                  justifyContent={"center"} alignItems={"center"} lg={12} md={12}>
                <Grid item container height={"100%"} mt={{lg: 5}} alignItems={"center"} justifyContent={"center"} lg={6}
                      md={6} xs={12}>
                    <Grid item container md={10} lg={10} marginTop={{lg: 2}}>
                        <Grid item container md={10} lg={10} justifyContent={"center"}>
                            <Grid item container borderLeft={{lg: 3, md: 0}} borderColor={{lg: '#D6C109'}}
                                  alignItems={"center"} height={{lg: 40}} lg={11.5} xs={12}
                                  justifyContent={{lg: 'start', xs: 'center'}}>
                                <Typography fontSize={{lg: "30px"}} ml={{lg: 1}} color={colors.black.main}
                                            alignItems={{lg: "center"}}
                                            variant={{lg: "h1"}}>ایجاد حساب کاربری</Typography>
                            </Grid>
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
                                            id="fname"
                                            name="fname"
                                            label={"نام پدر"}
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
                                            label={"شماره تماس "}
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
                                            id="fname"
                                            name="fname"
                                            label={"شماره تماس"}
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
                                            label={"کد ملی"}
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

                                <Grid item container justifyContent={"center"} marginTop={{lg: 3, xs: 3, md: 5}} lg={12}
                                      md={12}>
                                    <MTButton disabled={checked[1] ? false : true} register type="submit">ثبت نام</MTButton>
                                </Grid>
                                <Grid item container justifyContent={"center"} marginTop={{lg: 3, xs: 3, md: 5}} lg={12}
                                      md={12}>
                                    <Typography color={colors.black.main} variant="caption">من قبلا ثبت نام کرده ام؟ <span
                                        style={{color: `${colors.yellow.main}`, fontSize: '14px', cursor: 'pointer'}}>صفحه ورود</span></Typography>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container height={"100%"} alignItems={"center"}
                    // position={{ xs: 'absolute' }}
                      justifyContent={{lg: 'center', md: 'center', xs: 'center'}} lg={6} md={6} sm={6}
                      display={{xs: 'flex', md: 'flex', lg: 'flex', sm: 'flex'}}
                >
                    <Image src={Myimg}  alt="images"/>
                </Grid>
                <Snackbar open={openMessage} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={typeMessage} sx={{width: '100%'}}>
                        <Typography variant={'caption'}>{message}</Typography>
                    </Alert>
                </Snackbar>
            </Grid>
        </DashboardLayout>
    )
}
export default SignupPage


