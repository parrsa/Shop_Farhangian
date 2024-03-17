import React, {useEffect, useState} from 'react';
import {AlertColor, Grid, IconButton, InputAdornment, InputLabel, Stack, TextField, Typography} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MTButton from "@/Components/Mbutton";
import MInput from "@/Components/Minput";
import * as yup from "yup";
import colors from "../../Assets/theme/base/colors";
import Cookies from "js-cookie";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import DashboardLayout from "@/Components/Dashboard/Layout";
import axios from "axios";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import ClearIcon from "@mui/icons-material/Clear";

const formValidationSchema = yup.object({
    Address: yup.string().required('انتخاب آدرس الزامی است'),
    Sabeghe: yup.string().required('انتخاب سابقه کار خود الزامی است'),
    Description: yup.string().required('انتخاب نوع زمان الزامی است'),
    FatherName:yup.string().required('انتخاب نوع زمان الزامی است'),
    CodeMelli:yup.string().required('انتخاب نوع زمان الزامی است')

});

let alertColor: AlertColor | undefined;

const Profiles = () => {
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    const Cook = Cookies.get('TokenLogin')
    const [helperText, setHelperText] = React.useState('Choose wisely');
    const [MeharetFani, setMeharetFani] = React.useState()
    const [openMessage, setOpenMessage] = React.useState(false);
    const [typeMessage, setTypeMessage] = React.useState('')
    const [showVerify, setshowVerify] = React.useState(false);
    const [message, setMessage] = React.useState('')
    const [ostan, setOstan] = React.useState<any>([]);
    const [Address, setAddress] = React.useState('')
    const [FatherName, setFatherName] = React.useState('')
    const [PhoneNumber, setPhoneNumber] = React.useState('')
    const [Sabeghe_Kar, setSabeghe_kar] = React.useState('')
    const [birth_date, setbirth_date] = React.useState('')
    const [CodeMeli, setCodeMeli] = React.useState('')


    const Profile=[...Array(ostan).map((item: any)=>item)]
    const AddresServer=Profile.map((item)=>item.address)
    const birthdateServers=Profile.map((item)=>item.birthdate)
    const codeMelliServers=Profile.map((item)=>item.codeMelli)
    const imageServers=Profile.map((item)=>item.image)
    const phoneNumberServers=Profile.map((item)=>item.phoneNumber)
    const fatherNameServers=Profile.map((item)=>item.fatherName)

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
        setHelperText(' ');
        setError(false);
    };


    useEffect(() => {
        const getData = async () => {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${Cook}`,
                }
            };
            const response = await fetch(`https://farhangian.birkar.ir/api/User/Profile`, config)
            const data = await response.json();
                setOstan(data.data)
        }
        getData()

    }, [])
    const [uploadedFile, setUploadedFile] = useState(null);

    const [formValues, setFormValues] = useState([]); // مقادیر فرم
    const [active, setActive] = useState(false); // وضعیت فعال یا غیرفعال بودن ورودی‌ها
    const [loading, setLoading] = useState(false); // وضعیت لودینگ برای ارسال درخواست به سرور
    const [uploadedFileName, setUploadedFileName] = React.useState("");
    const handleFileUploads = (event: any) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setUploadedFile(file);
            setUploadedFileName(file.name);
        }
    };
    const handleFileReset = () => {
        setUploadedFile(null);
        setUploadedFileName('');
    };
    const handleClickClear = () => {
        setUploadedFile(null);
        setUploadedFileName('');
    };
    const [Disable, setDisable] = useState(true)
    const HandellSubmite = () => {
        if (Disable) {
            setDisable(false)
        } else if (birth_date || Address || PhoneNumber || FatherName || CodeMeli) {
            const poshtibani = async () => {
                const config = {
                    headers: {
                        'Content-type': 'multipart/form-data',
                        'Authorization': `Bearer ${Cook}`,
                    }
                }
                try {
                    setLoading(true); // فعال کردن وضعیت لودینگ
                    const formData=new FormData();
                    formData.append('FirstName', '' )
                    formData.append('LastName', '' )
                    formData.append('Address', Address )
                    formData.append('CodeMelli', CodeMeli )
                    formData.append('Birthdate', birth_date )
                    formData.append('FatherName', FatherName)
                    formData.append('PhoneNumber', PhoneNumber )
                    if (uploadedFile) {
                        formData.append('image', uploadedFile);
                    }
                    const response = await axios.put(`https://farhangian.birkar.ir/api/User/Update `,
                       formData,
                        config
                    )
                    if (response.status === 200) {
                        setMessage('با موفقیت شکایت شما ثبت شد')
                        setTypeMessage('success')
                        setOpenMessage(true)
                        setTimeout(() => {
                        }, 2000)
                        setLoading(false); // غیرفعال کردن وضعیت لودینگ
                    }
                } catch (error: any) {
                    setTypeMessage('error')
                    setOpenMessage(true)
                    setMessage(error.message)
                    setLoading(false); // فعال کردن وضعیت لودینگ

                }
            }
            poshtibani();
        }

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
                                    {Profile.map((item)=>item.codeMelli)}   نامفهوم از صنعت چاپ </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container lg={12} justifyContent={'center'}>
                </Grid>
                {[...Array(ostan)].map((item: any) => (<>

                    <Grid lg={12} item container justifyContent={'space-around'} p={2}>
                        <Grid item container justifyContent={'center'} alignItems={'center'} lg={6} p={2}>
                            <img src={`https://farhangian.birkar.ir/${item?.image}`} alt="User" style={{ width: 150, height: 150, borderRadius: '50%' }} />
                        </Grid>

                        <Grid item container justifyContent={'center'} lg={6} alignItems={'center'} p={2}>
                            <FormControl sx={{width: {lg: 380, xs: 220, md: 350}}}>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    {!uploadedFileName && (
                                        <MTButton
                                            selectimages
                                            sx={{
                                                // backgroundColor: "white",
                                                // color: "black.main",
                                                // fontSize: "1rem",
                                                // border: "1px dashed rgba(0, 0, 0, 0.12)",
                                                width: "100%",
                                                height: "45px",
                                                boxShadow: "none",
                                                // "&:hover": {
                                                //     backgroundColor: "#FAFAFA",
                                                //     boxShadow: "none"
                                                // }
                                            }}
                                            startIcon={<CloudUploadRoundedIcon/>}
                                            variant="contained"
                                            component="label"
                                        >
                                            <Typography variant={'h1'} color={'black.main'}>انتخاب عکس جدید</Typography>
                                            <input
                                                hidden
                                                accept="image/*"
                                                multiple
                                                type="file"
                                                onChange={handleFileUploads}
                                            />
                                        </MTButton>
                                    )}
                                    {uploadedFileName && (
                                        <TextField
                                            variant="outlined"
                                            value={uploadedFileName}
                                            disabled
                                            sx={{
                                                width: "100%"
                                            }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <DescriptionRoundedIcon/>
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickClear}
                                                            edge="end"
                                                        >
                                                            <ClearIcon/>
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    )}
                                </Stack>
                            </FormControl>
                        </Grid>

                    </Grid>
                    <Grid lg={12} item container justifyContent={'space-around'} p={2}>

                        <FormControl sx={{m: 0, width: {lg: 380, xs: 220, md: 350,}, marginTop: 3}}>
                            <InputLabel sx={{marginTop:"-15px",
                                fontFamily: 'Yekan Bakh Medium',
                                fontSize: "1.2rem",
                                fontWeight: "bold !important",
                                color: colors.black.main + "!important",

                            }} shrink htmlFor="bootstrap-input">
                                نام :
                            </InputLabel>
                            <MInput
                                popup
                                id="Name"
                                name="Name"
                                placeholder={item?.firstName}
                                // placeholder={item.user?.first_name + " " + item.user?.last_name ?? ''}
                                disabled={'true'}
                                sx={{
                                    '& .placeholder': {
                                        color: 'red',
                                        opacity: 1, // otherwise firefox shows a lighter color
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
                                placeholder={item?.lastName ?? ''}
                                // placeholder={item.user?.first_name + " " + item.user?.last_name ?? ''}
                                disabled={'true'}
                                sx={{
                                    '& .placeholder': {
                                        color: 'red',
                                        opacity: 1, // otherwise firefox shows a lighter color
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
                                disabled={!active}
                                value={PhoneNumber}
                                onChange={(e: any) => setPhoneNumber(e.target.value)}
                                placeholder={item?.phoneNumber == '' ? "آدرس خود را واردکنید" : item?.phoneNumber}

                            />
                        </FormControl>
                        <FormControl sx={{ml: {lg: 1}, width: {lg: 380, xs: 220, md: 350}, marginTop: 3}}>
                            <InputLabel sx={{marginTop:"-15px",
                                fontFamily: 'Yekan Bakh Medium',
                                fontSize: "1.2rem",
                                fontWeight: "bold !important",
                                color: colors.black.main + "!important",

                            }} shrink htmlFor="bootstrap-input">
                                کد پرسنلی :
                            </InputLabel>
                            <MInput
                                popup
                                id="codePersonneli"
                                value={Sabeghe_Kar}
                                name="codePersonneli"
                                disabled={true}
                                placeholder={item?.codePersonneli ?? ''}
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
                                نام پدر :
                            </InputLabel>
                            <MInput
                                popup
                                id="FatherName"
                                name="FatherName"
                                value={FatherName}
                                onChange={(e: any) => setFatherName(e.target.value)}
                                disabled={!active}
                                // label={Disable ? item?.fatherName == '' ? "آدرس خود را ویرایش کنید" : item?.fatherName : 'آدرس'}
                                placeholder={item?.fatherName == '' ? "آدرس خود را واردکنید" : item?.fatherName}
                            />
                        </FormControl>
                        <FormControl sx={{ml: {lg: 1}, width: {lg: 380, xs: 220, md: 350}, marginTop: 3}}>
                            <InputLabel sx={{marginTop:"-15px",
                                fontFamily: 'Yekan Bakh Medium',
                                fontSize: "1.2rem",
                                fontWeight: "bold !important",
                                color: colors.black.main + "!important",

                            }} shrink htmlFor="bootstrap-input">
                                کدملی
                            </InputLabel>
                            <MInput
                                popup
                                value={CodeMeli}
                                onChange={(e: any) => setCodeMeli(e.target.value)}
                                disabled={!active}
                                placeholder={item?.codeMelli == '' ? 'کدملی خود را وارد کنید' : item?.codeMelli}
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
                                    disabled={!active}
                                    // label={Disable ? item?.address == '' ? "آدرس خود را ویرایش کنید" : item?.address : 'آدرس'}
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
                                // id="birth_date"
                                // name="birth_date"
                                value={birth_date}
                                onChange={(e: any) => setbirth_date(e.target.value)}
                                disabled={!active}
                                placeholder={Disable ? item?.birthdate == '' ? 'تاریخ تولد خود را ویرایش کنید' : item?.birthdate : 'تاریخ تولد'}
                                // placeholder={item?.birthdate == '' ? 'تاریخ تولد خود را با ترتیب (سال و ماه و روز) وارد کنید' : item?.birth_date}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item container justifyContent={'space-evenly'} p={2} lg={6}  alignItems={'center'}>
                        {/*<MTButton color="primary" variant="contained" onClick={HandellSubmite} submite type="submit">*/}
                        {/*    تغییر اطلاعات*/}
                        {/*</MTButton>*/}

                        <MTButton
                            submite
                            onClick={() => {
                                setActive(!active); // فعال کردن ویرایش ورودی‌ها
                            }}
                        >
                            ویرایش اطلاعات
                        </MTButton>
                        <MTButton
                            submite
                            sx={{color:'white.main'}}
                            onClick={() => {
                                HandellSubmite(); // ارسال درخواست به سرور برای به‌روزرسانی اطلاعات
                            }}
                            disabled={!active || loading} // دکمه فقط در صورت فعال بودن ویرایش و در صورتی که در حالت لودینگ نباشیم فعال است
                        >
                            {loading ? "در حال ارسال..." : "ثبت تغییرات"}
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


//
// import React, { useState } from 'react';
// import { TextField, Button, Grid } from '@mui/material';
// import axios from 'axios';
//
// const ProfileAdminPage = () => {
//     // State for admin profile information
//     const [check,setCheckd]=React.useState(true)
//     const [profile, setProfile] = useState({
//         name: 'Admin Name',
//         email: 'admin@example.com',
//         password: 'password123',
//         // Add more fields as needed
//     });
//
//     // Function to handle changes in profile fields
//     const handleChange = (e:any) => {
//         const { name, value } = e.target;
//         setProfile((prevProfile) => ({
//             ...prevProfile,
//             [name]: value,
//         }));
//     };
//
//     // Function to save changes
//     const saveChanges = async () => {
//         setCheckd(false)
//         try {
//             // Make API request to update profile information
//             const response = await axios.put('API_ENDPOINT', profile);
//             console.log(response.data); // Handle success response
//         } catch (error) {
//             console.error('Error updating profile:', error);
//         }
//     };
//
//     return (
//         <Grid container spacing={2}>
//             <Grid item xs={12}>
//                 <TextField
//                     fullWidth
//                     label="Name"
//                     name="name"
//                     value={profile.name}
//                     onChange={handleChange}
//                     disabled={check}
//                 />
//             </Grid>
//             <Grid item xs={12}>
//                 <TextField
//                     fullWidth
//                     label="Email"
//                     name="email"
//                     value={profile.email}
//                     onChange={handleChange}
//                     disabled={check}
//
//                 />
//             </Grid>
//             <Grid item xs={12}>
//                 <TextField
//                     fullWidth
//                     label="Password"
//                     type="password"
//                     name="password"
//                     value={profile.password}
//                     onChange={handleChange}
//                     disabled={check}
//                 />
//             </Grid>
//             {/* Add more fields as needed */}
//             <Grid item xs={12}>
//                 <Button variant="contained" color="primary" onClick={saveChanges}>
//                     Save Changes
//                 </Button>
//             </Grid>
//         </Grid>
//     );
// };
//
// export default ProfileAdminPage;
