import SettingLayout from "@/Components/SettingLayout";
import {Grid, IconButton, InputAdornment} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MInput from "@/Components/Minput";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import MTButton from "@/Components/Mbutton";
import React from "react";
import {useFormik} from "formik";
import axios from "axios";
import {useCookies} from "react-cookie";
import * as yup from "yup";
const formValidationSchema = yup.object({
    phone: yup.string().required('نام کاربری الزامی است'),
    pass: yup.string().required('رمزعبور الزامی است'),
});

const formValidationSchemas = yup.object({
    NowPassword: yup.string().required('نام کاربری الزامی است'),
    NewPassword: yup.string().required('رمزعبور الزامی است'),
    ConfirmPassword: yup.string().required('تکرار رمزعبور الزامی است').oneOf([yup.ref('NewPassword')], 'پسورد و تکرار آن باهم یکی نیستن!'),
});
const ProfileAdmin=()=>{
    const [openMessage, setOpenMessage] = React.useState(false);
    const [typeMessage, setTypeMessage] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false);
    const [Cookiess, SetCookies] = useCookies(['TokenLogin'])
    const [TokenChangePass,setTokenChangePass]=React.useState<any>()
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
                        if(response.data.data.isChangePassword) {
                            SetCookies('TokenLogin', response.data.data.access_token)
                            setMessage('با موفقیت وارد شوید')
                            setTypeMessage('success')
                            setOpenMessage(true)
                        } else {
                            setTokenChangePass(response.data.data.access_token)
                            setMessage('برای اولین بار باید پسورد خود را تغییر دهید')
                            setTypeMessage('warning')
                            setOpenMessage(true)

                        }
                    }
                } catch (error: any) {
                    setTypeMessage('error')
                    setOpenMessage(true)
                    setMessage(error.response.data.Message)
                }
            }
            login();
        },
    });

    return(
        <SettingLayout>
            <Grid item container lg={12} justifyContent={'center'}>
                <Grid item container lg={11}>
                    <form onSubmit={formik.handleSubmit} style={{width:'100%'}}>

                        <Grid item container justifyContent={"center"} lg={6} bgcolor={'red.main'}>
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
                        <Grid item container justifyContent={"center"} lg={6}>
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
                            </FormControl>
                        </Grid>
                        <Grid item container justifyContent={"center"} marginTop={{lg: 3, xs: 3, md: 5}}
                              lg={12} md={12}>
                            <MTButton register type="submit">ورود</MTButton>
                        </Grid>
                    </form>

                </Grid>
            </Grid>
        </SettingLayout>
    )
}
export default ProfileAdmin
