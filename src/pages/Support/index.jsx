import React from "react";
import {Grid, Typography, IconButton, Button} from "@mui/material";
import {useFormik} from 'formik';
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import * as yup from 'yup';
import axios from 'axios';
import colors from "../../Assets/theme/base/colors";
import Images from '../../Assets/images/Work_4.jpg';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';
import Cookies from "js-cookie";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import MInput from "../../Components/Minput";
import MTButton from "../../Components/Mbutton";
import Image from "next/image";
import DashboardLayout from "../../Components/Dashboard/Layout";
import url from '@/Api';

const formValidationSchema = yup.object({
    fname: yup.string().required('نام  الزامی است'),
    lname: yup.string().required('نام خانوادگی الزامی است'),
    Issue: yup.string().required('موضوع درخواست الزامی است'),
    Description: yup.string().required('توضیحات  الزامی است'),
});


const SignInPage = () => {
    const [openMessage, setOpenMessage] = React.useState(false);
    const [typeMessage, setTypeMessage] = React.useState('')
    const [message, setMessage] = React.useState()
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPassword1, setShowPassword1] = React.useState(false);


    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
    const handleMouseDownPassword1 = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClose = (event, reason) => {
        setOpenMessage(false);
    };
    const Cook = Cookies.get('TokenLogin')

    const formik = useFormik({
        initialValues: {
            fname: '',
            lname: '',
            Issue: '',
            Description:''
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
                    const response = await axios.post(`${url}/api/Support/Create`,
                        {
                            "id": 0,
                            "firstName": values.fname,
                            "lastName": values.lname,
                            "title": values.Issue,
                            "description": values.Description
                        },
                        config
                    )
                    if (response.status === 200) {
                        setTypeMessage('success')
                        setMessage('با موفقیت درخواست  شما ثبت شد')
                        setOpenMessage(true)
                        formik.resetForm()
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
        <Grid container sx={{backgroundSize: {xs: 'cover', md: "cover", lg: 'cover'}}} height={{lg: "91vh", md: '105vh'}} flexDirection={{md: 'column-reverse', xs: 'column-reverse'}} justifyContent={"center"} alignItems={"center"} lg={12} md={12}>
            <Grid item container height={"100%"}
                //  zIndex={{ xs: 1 }}
                  alignItems={"center"} justifyContent={"center"} lg={6} md={6} xs={6}>
                <Grid item container md={10} marginTop={{lg: 2}}>
                    <Grid item container md={10} justifyContent={"center"}>
                        <Grid item container borderLeft={{lg: 3, md: 0}} borderColor={{lg: '#D6C109'}}
                              alignItems={"center"} height={{lg: 40}} lg={11.5} xs={12}
                              justifyContent={{lg: 'start', xs: 'center'}}>
                            <Typography fontSize={{lg: "30px"}} ml={{lg: 1}} color={colors.black.main} alignItems={{lg: "center"}} variant={{lg: "h1"}}>فرم پشتیبانی</Typography>
                        </Grid>
                        <>


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
                                <Grid item container justifyContent={"start"} lg={12}>
                                    <FormControl sx={{m: 0, width: "100%", marginTop: 3}}>
                                        <MInput
                                            popup
                                            id="Issue"
                                            name="Issue"
                                            type={"text"}
                                            label={"موضوع"}
                                            value={formik.values.Issue}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.Issue && Boolean(formik.errors.Issue)}
                                            helperText={formik.touched.Issue && formik.errors.Issue}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item container justifyContent={"start"} lg={12}>
                                    <FormControl sx={{m: 0, width: {lg: '100%', xs: '100%', md: 350,}, marginTop: 3}}>
                                        <MInput
                                            textarea
                                            id="Description"
                                            name="Description"
                                            label="توضیحات"
                                            type="textarea"
                                            value={formik.values.Description}
                                            placeholder="توضیحات خود را بنویسید"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.Description && Boolean(formik.errors.Description)}
                                            helperText={formik.touched.Description && formik.errors.Description}
                                            minRows={5}
                                            maxRows={4}
                                            multiline
                                        />
                                    </FormControl>

                                </Grid>
                                <Grid item container justifyContent={"center"} marginTop={{lg: 3, xs: 3, md: 5}} lg={12}
                                      md={12}>
                                    <MTButton register type="submit">ثبت درخواست</MTButton>
                                </Grid>

                            </form>

                        </>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container height={"100%"} alignItems={"center"} justifyContent={{lg: 'center', md: 'center', xs: 'center'}} lg={6} md={6} sm={6} display={{xs: 'flex', md: 'flex', lg: 'flex', sm: 'flex'}}>
            <Image src={Images} layout="responsive" width={600} height={400} alt="images" />
                
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
export default SignInPage

