import React, { useState} from 'react';
import {AlertColor, Grid, InputLabel, Typography} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MTButton from "@/Components/Mbutton";
import MInput from "@/Components/Minput";
import * as yup from "yup";
import colors from "../../Assets/theme/base/colors";
import Cookies from "js-cookie";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import DashboardLayout from "@/Components/Dashboard/Layout";

const formValidationSchema = yup.object({
    Address: yup.string().required('انتخاب آدرس الزامی است'),
    Sabeghe: yup.string().required('انتخاب سابقه کار خود الزامی است'),
    Description: yup.string().required('انتخاب نوع زمان الزامی است'),
});

let alertColor: AlertColor | undefined;

const Profiles = () => {
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    const [Check,setCheck]=React.useState(true)
    const Cook = Cookies.get('Tokenlogin')
    const [helperText, setHelperText] = React.useState('Choose wisely');
    const [openMessage, setOpenMessage] = React.useState(false);
    const [typeMessage, setTypeMessage] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [ostan, setOstan] = React.useState<any[]>([]);
    const [Address, setAddress] = React.useState('')
    const [Sabeghe_Kar, setSabeghe_kar] = React.useState('')
    const [birth_date, setbirth_date] = React.useState('')
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
        setHelperText(' ');
        setError(false);
    };


    const [Disable, setDisable] = useState(true)
    const HandellSubmite = () => {
        setCheck(!Check)
    }
    const handleCloseAlert = () => {
        setOpenMessage(false);
    };



    return (
        <DashboardLayout>
            <Grid container zIndex={10} item xs={12} md={12} marginTop={5} justifyContent={"center"}>
                <Grid lg={12} p={2} item alignItems={'center'} container>
                    <Grid item container xs={12} md={12} justifyContent={"center"}
                          textAlign={{xs: "center", md: "center"}} alignItems={"center"}>
                        <Grid item container lg={10} justifyContent={"space-between"} alignItems={"center"}>
                            <Grid item container lg={4} alignItems={"start"} flexDirection={"column"}>
                                <Typography variant="h4" color={colors.black.main}>اطلاعات کاربری</Typography>
                                <Typography variant="subtitle2" mt={{lg: 2}}>لورم ایپسوم متن ساختگی با تولید سادگی
                                    نامفهوم از صنعت چاپ </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container lg={12} justifyContent={'center'}>
                </Grid>
                {[...Array(ostan)].map((item: any) => (<>
                    <Grid lg={12} item container justifyContent={'space-around'} p={2}>

                        <FormControl sx={{m: 0, width: {lg: 380, xs: 220, md: 350,}, marginTop: 3}}>
                            <InputLabel sx={{marginTop:"-15px",
                                fontFamily: 'Yekan Bakh Medium',
                                fontSize: "1.2rem",
                                fontWeight: "bold !important",
                                color: colors.black.main + "!important",

                            }} shrink htmlFor="bootstrap-input">
                                نام  :
                            </InputLabel>
                            <MInput
                                popup
                                id="Name"
                                name="Name"
                                label={item.user?.first_name}
                                disabled={Check}
                                sx={{
                                    '& .placeholder': {
                                        color: 'red',
                                        opacity: 1,
                                    },
                                }}
                            />
                        </FormControl>

                        <FormControl sx={{m: 0, width: {lg: 380, xs: 220, md: 350,}, marginTop: 3}}>
                            <InputLabel sx={{marginTop:"-15px",
                                fontFamily: 'Yekan Bakh Medium',
                                fontSize: "1.2rem",
                                fontWeight: "bold !important",
                                color: colors.black.main + "!important",

                            }} shrink htmlFor="bootstrap-input">
                                نام خانوادگی :
                            </InputLabel>
                            <MInput
                                popup
                                id="Name"
                                name="Name"
                                label={item.user?.last_name ?? ''}
                                disabled={Check}
                                sx={{
                                    '& .placeholder': {
                                        color: 'red',
                                        opacity: 1,
                                    },
                                }}
                            />
                        </FormControl>

                    </Grid>
                    <Grid item container justifyContent={'space-around'} lg={12} p={2}>
                        <FormControl sx={{ml: {lg: 1}, width: {lg: 380, xs: 220, md: 350}, marginTop: 3}}>
                            <InputLabel sx={{marginTop:"-15px",
                                fontFamily: 'Yekan Bakh Medium',
                                fontSize: "1.2rem",
                                fontWeight: "bold !important",
                                color: colors.black.main + "!important",

                            }} shrink htmlFor="bootstrap-input">
                                شماره موبایل  :
                            </InputLabel>
                            <MInput
                                popup
                                id="PhoneNumber"
                                name="PhoneNumber"
                                type={'number'}
                                disabled={Check}
                                label={item.user?.username ?? ''}
                            />
                        </FormControl>
                        <FormControl sx={{ml: {lg: 1}, width: {lg: 380, xs: 220, md: 350}, marginTop: 3}}>
                            <InputLabel sx={{marginTop:"-15px",
                                fontFamily: 'Yekan Bakh Medium',
                                fontSize: "1.2rem",
                                fontWeight: "bold !important",
                                color: colors.black.main + "!important",

                            }} shrink htmlFor="bootstrap-input">
                                سابقه کار :
                            </InputLabel>
                            <MInput
                                popup
                                id="Sabeghe_Kar"
                                value={Sabeghe_Kar}
                                onChange={(e: any) =>  setSabeghe_kar(e.target.value)}
                                name="Sabeghe_Kar"
                                disabled={Check}
                                label={Disable ? item?.sabeghe_kar == '' ? "سابقه کار خود را ویرایش کنید" : item?.sabeghe_kar : 'سابقه کار'}
                                placeholder={item?.sabeghe_kar == '' ? "سابقه کار خود را واردکنید" : item?.sabeghe_kar}
                            />
                        </FormControl>


                    </Grid>
                    <Grid item container justifyContent={'space-around'} lg={12} p={2}>
                        <FormControl sx={{ml: {lg: 1}, width: {lg: 380, xs: 220, md: 350}, marginTop: 3}}>
                            <InputLabel sx={{marginTop:"-15px",
                                fontFamily: 'Yekan Bakh Medium',
                                fontSize: "1.2rem",
                                fontWeight: "bold !important",
                                color: colors.black.main + "!important",

                            }} shrink htmlFor="bootstrap-input">
                                آدرس :
                            </InputLabel>
                            <MInput
                                popup
                                id="Address"
                                name="Address"
                                value={Address}
                                onChange={(e: any) => setAddress(e.target.value)}
                                disabled={Check}
                                label={Disable ? item?.address == '' ? "آدرس خود را ویرایش کنید" : item?.address : 'آدرس'}
                                placeholder={item?.address == '' ? "آدرس خود را واردکنید" : item?.address}
                            />
                        </FormControl>


                        <FormControl sx={{ml: {lg: 1}, width: {lg: 380, xs: 220, md: 350}, marginTop: 3}}>
                            <InputLabel sx={{marginTop:"-15px",
                                fontFamily: 'Yekan Bakh Medium',
                                fontSize: "1.2rem",
                                fontWeight: "bold !important",
                                color: colors.black.main + "!important",

                            }} shrink htmlFor="bootstrap-input">
                                تاریخ تولد :
                            </InputLabel>
                            <MInput
                                popup
                                value={birth_date}
                                onChange={(e: any) => setbirth_date(e.target.value)}
                                disabled={Check}
                                label={Disable ? item?.birth_date == '' ? 'تاریخ تولد خود را ویرایش کنید' : item?.birth_date : 'تاریخ تولد'}
                                placeholder={item?.birth_date == '' ? 'تاریخ تولد خود را با ترتیب (سال و ماه و روز) وارد کنید' : item?.birth_date}
                            />
                        </FormControl>


                    </Grid>

                    <Grid item container justifyContent={'center'} p={2} alignItems={'center'}>
                        <MTButton color="primary" variant="contained" onClick={HandellSubmite} submite type="submit">
                            تغییر اطلاعات
                        </MTButton>
                    </Grid>
                </>))}


                <Snackbar open={openMessage} autoHideDuration={4500}
                          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity={typeMessage as AlertColor} sx={{width: '100%'}}>
                        <Typography variant={'caption'}>{message}</Typography>
                    </Alert>
                </Snackbar>
            </Grid>
        </DashboardLayout>
    );
};
export default Profiles
