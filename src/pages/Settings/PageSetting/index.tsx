import SettingLayout from "@/Components/SettingLayout";
import {
    AlertColor, Box,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel, List,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import * as React from "react";
import MInput from "@/Components/Minput";
import FormControl from "@mui/material/FormControl";
import MTButton from "@/Components/Mbutton";
import 'devextreme/dist/css/dx.light.css';

const eventHandlingLabel = {'aria-label': 'Event Handling'};

import {ColorBox, ColorBoxTypes} from 'devextreme-react/color-box';
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import ClearIcon from "@mui/icons-material/Clear";
import {useFormik} from "formik";
import * as yup from "yup";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import colors from "@/Assets/theme/base/colors";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {CSSTransition} from "react-transition-group";
import Mbutton from "@/Components/Mbutton";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {SketchPicker} from "react-color";
const formValidationSchema = yup.object({
    phone: yup.string().required('شماره موبایل الزامی است'),
    pass: yup.string().required('رمزعبور الزامی است'),
});
const colorsss = {
    width: '36px',
    height: '14px',
    borderRadius: '2px',
    background: `rgba(241, 112, 19, 1)`,

}
const PageSetting = () => {
    const [openMessage, setOpenMessage] = React.useState(false);
    const [typeMessage, setTypeMessage] = React.useState('')
    const [showVerify, setshowVerify] = React.useState(false);
    const [message, setMessage] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false);
    const [color, setColor] = React.useState('#f05b41');
    const handleColorChange = React.useCallback(({value}: ColorBoxTypes.ValueChangedEvent) => {
        setColor(value);
    }, []);
    const [uploadedFileName, setUploadedFileName] = React.useState("");
    const [files, setFiles] = React.useState<File | undefined>(undefined);
    const [ostan, setOstan] = React.useState<any[]>([]);
    const [uploadedFile, setUploadedFile] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://farhangian.birkar.ir/api/Advertisement/GetAll')
            const data = await response.json();
            setOstan(data.data);
        }
        getData()
    }, [ostan]);

    const [displayColorPicker, setDisplayColorPicker] = React.useState(false);
    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    const [background, setBackground] = React.useState('#fff');
    const handleChangeComplete = (color:any) => {
        setBackground(color.hex);
    };


    // Chose BackgroundColor
    const [displayColorPickerBackgroundColor, setDisplayColorPickerBackgroundColor] = React.useState(false);
    const [BackgroundColor, SetBackgroundColor] = React.useState('400606')

    const handleChangeBackground = (newColor: any) => {
        SetBackgroundColor(newColor.hex)
    }
    const handleClickBackground = () => {
        setDisplayColorPickerBackgroundColor(!displayColorPickerBackgroundColor);
    };

    const handleCloseBackground = () => {
        setDisplayColorPickerBackgroundColor(false);
    };



    // Chose TitleColor
    const [displayColorPickerTitleColor, setDisplayColorPickerTitleColor] = React.useState(false);
    const [TitleColor, SetTitleColor] = React.useState('BB1C27')

    const handleChangeTitle = (newColor: any) => {
        SetTitleColor(newColor.hex)
    }
    const handleClickTitle = () => {
        setDisplayColorPickerTitleColor(!displayColorPickerBackgroundColor);
    };

    const handleCloseTitle = () => {
        setDisplayColorPickerTitleColor(false);
    };





    // Chose TextColor
    const [displayColorPickerTextColor, setDisplayColorPickerTextColor] = React.useState(false);
    const [TextColor, SetTextColor] = React.useState('BB1C27')

    const handleChangeText = (newColor: any) => {
        SetTextColor(newColor.hex)
    }
    const handleClickText = () => {
        setDisplayColorPickerTextColor(!displayColorPickerBackgroundColor);
    };

    const handleCloseText = () => {
        setDisplayColorPickerTextColor(false);
    };


    const handleFileReset = () => {
        setUploadedFile(null);
        setUploadedFileName('');
    };
    const handleClickClear = () => {
        setUploadedFile(null);
        setUploadedFileName('');
    };
    const handleFileUploads = (event:any) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const file = files[0];
            setUploadedFile(file);
            setUploadedFileName(file.name);
        }
    };
    const [loading, setLoading] = useState(false); // وضعیت لودینگ برای ارسال درخواست به سرور

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
                        'Content-type': 'multipart/form-data',
                        'Authorization': `Bearer ${Cook}`,

                    },
                };
                try {

                    setLoading(true); // فعال کردن وضعیت لودینگ
                    const formData = new FormData();
                    formData.append('title', values.phone);
                    formData.append('description', values.pass);
                    formData.append('desForeColor', TextColor);
                    formData.append('backgroundColor', BackgroundColor);
                    formData.append('titleForeColor', TitleColor);
                    if (uploadedFile) {
                        formData.append('Image', uploadedFile);
                    }

                    const response = await axios.post(`https://farhangian.birkar.ir/api/Advertisement/Create`,
                        formData,
                        config
                    )

                    if (response.status === 200) {
                        handleFileReset();
                        setshowVerify(true)
                        setMessage("با موفقیت ایجاد شد")
                        setTypeMessage('success')
                        setOpenMessage(true)
                        formik.resetForm();
                        setTimeout(() => {
                            // navigate('/')
                        }, 3000)
                        setLoading(false); // فعال کردن وضعیت لودینگ

                    }
                } catch (error: any) {
                    setTypeMessage('error')
                    setOpenMessage(true)
                    setMessage(error.response.data.message)
                    setLoading(false); // فعال کردن وضعیت لودینگ

                }
            }
            login();
        },
    });
    const handleCloseAlert = () => {
        setOpenMessage(false);
    };
    const Cook = Cookies.get('TokenLogin');

    const handelDeleted=(item:any)=>{
        const Deleted = async () => {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${Cook}`,
                }
            }
            try  {
                const response = await axios.delete(`https://farhangian.birkar.ir/api/Advertisement/Delete?id=${item}`,
                    config
                )
                if (response.status === 200) {
                    setMessage('شعار شما با موفقیت حذف شد')
                    setTypeMessage('warning')
                    setOpenMessage(true)
                }
            } catch (error:any) {
                setTypeMessage('error')
                setOpenMessage(true)
                setMessage(error.message)
            }
        }
        Deleted()
    }
    const [open, setopen] = React.useState(false)
    const [Id, setID] = React.useState();
    const handleAddFruit = (item: any) => {
        setID(item);
        setopen(!open);
    };








    return (
        <SettingLayout>
            <Grid item container lg={12} justifyContent={'center'} mt={2}>

                <Grid item container lg={10} boxShadow={5} justifyContent={'center'} borderRadius={2}
                      bgcolor={'white.main'}>
                    <Grid item container lg={10}  mt={2}>
                        <Typography variant={'h1'} >تبلیغات موجود :</Typography>
                    </Grid>
                    <Grid item container lg={12} maxHeight={'50vh'} minHeight={'50vh'} justifyContent={'center'}
                          overflow={'auto'}>
                        {ostan.map((item:any)=>(
                        <>
                            <Grid item container lg={10} xs={10} maxHeight={'8vh'} minHeight={'8vh'}
                                  bgcolor={'white.main'}
                                  boxShadow={'1px 1px 10px 1px #C4C4C4'} my={1} borderRadius={1}
                                  justifyContent={{
                                      lg: 'space-between',
                                      md: 'space-between',
                                      xs: 'space-between',
                                  }} alignItems={'start'}>
                                <Grid item container lg={4} xs={12} justifyContent={'center'} mt={{lg: 2, xs: 2}} alignItems={"center"}>
                                    <Typography variant="h1" color={colors.yellow.main}>{item.title?.slice(0,25)}</Typography>
                                </Grid>

                                <Grid item container lg={4} xs={12} justifyContent={'center'} alignItems={"end"} mt={{xs: 2}}>
                                    <Grid item container lg={4} >
                                        <Typography sx={{cursor: "pointer"}} onClick={() => handleAddFruit(item.id)} variant="h1" color={colors.red.main}>ویرایش <span style={{color: colors.black.main}}></span></Typography>
                                    </Grid>
                                    <Grid item container lg={4}>
                                        <Typography sx={{cursor: "pointer"}} onClick={() => handelDeleted(item.id)} variant="h1" color={colors.red.main}>حذف<span style={{color: colors.black.main}}></span></Typography>
                                    </Grid>


                                </Grid>


                            </Grid>

                        </>

                    ))}
                </Grid>
                </Grid>
                <Grid item container lg={10} boxShadow={5} mt={5} justifyContent={'space-evenly'} borderRadius={2} bgcolor={'white.main'}>
                    <Grid item container lg={12} p={2}>
                        <Grid item container lg={3} alignItems={'center'}>
                            <Typography variant={'h1'} p={0.5}>نوار تبلیغاتی صفحه اصلی </Typography>
                        </Grid>
                        <Grid item container lg={6}>
                            <Grid item container lg={4} flexDirection={'column'} justifyContent={'center'}
                                  alignItems={'center'}>
                                <Typography variant={'caption'} p={0}>انتخاب رنگ پس زمینه </Typography>
                                <Box sx={{
                                    padding: '5px',
                                    background: '#fff',
                                    borderRadius: '1px',
                                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                                    display: 'inline-block',
                                    cursor: 'pointer',
                                    marginLeft: 1
                                }} onClick={handleClickBackground}>
                                    <Box style={{...colorsss, backgroundColor: `${BackgroundColor}`}}></Box>
                                </Box>
                                {displayColorPickerBackgroundColor ? (
                                    <Box sx={{position: 'absolute', zIndex: '2',}}>
                                        <Box sx={{position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px',}}
                                             onClick={handleCloseBackground}></Box>
                                        <SketchPicker color={BackgroundColor} onChange={handleChangeBackground}/>
                                    </Box>
                                ) : null}

                            </Grid>
                            <Grid item container lg={4} flexDirection={'column'} justifyContent={'center'}
                                  alignItems={'center'}>
                                <Typography variant={'caption'}>انتخاب رنگ عنوان متن </Typography>

                                <Box sx={{
                                    padding: '5px',
                                    background: '#fff',
                                    borderRadius: '1px',
                                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                                    display: 'inline-block',
                                    cursor: 'pointer',
                                    marginLeft: 1
                                }} onClick={handleClickTitle}>
                                    <Box style={{...colorsss, backgroundColor: `${TitleColor}`}}></Box>
                                </Box>
                                {displayColorPickerTitleColor ? (
                                    <Box sx={{position: 'absolute', zIndex: '2',}}>
                                        <Box sx={{position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px',}}
                                             onClick={handleCloseTitle}></Box>
                                        <SketchPicker color={TitleColor} onChange={handleChangeTitle}/>
                                    </Box>
                                ) : null}


                            </Grid>
                            <Grid item container lg={4} flexDirection={'column'} justifyContent={'center'}
                                  alignItems={'center'}>
                                <Typography variant={'caption'}>انتخاب رنگ متن </Typography>
                                <Box sx={{
                                    padding: '5px',
                                    background: '#fff',
                                    borderRadius: '1px',
                                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                                    display: 'inline-block',
                                    cursor: 'pointer',
                                    marginLeft: 1
                                }} onClick={handleClickText}>
                                    <Box style={{...colorsss, backgroundColor: `${TextColor}`}}></Box>
                                </Box>
                                {displayColorPickerTextColor ? (
                                    <Box sx={{position: 'absolute', zIndex: '2'}}>
                                        <Box sx={{position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px',}}
                                             onClick={handleCloseText}></Box>
                                        <SketchPicker color={TextColor} onChange={handleChangeText}/>
                                    </Box>
                                ) : null}
                            </Grid>
                        </Grid>
                        <Grid item container lg={3} justifyContent={'center'} alignItems={'end'}>
                            <FormControl sx={{width: {lg: 250, xs: 220, md: 350}}}>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    {!uploadedFileName && (
                                        <MTButton
                                            selectimages
                                            sx={{
                                                width: "100%",
                                                height: "45px",
                                                boxShadow: "none",
                                            }}
                                            startIcon={<CloudUploadRoundedIcon/>}
                                            variant="contained"
                                            component="label"
                                        >
                                            <Typography variant={'h1'} color={'black.main'}>انتخاب عکس</Typography>
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
                    <form onSubmit={formik.handleSubmit} style={{width:'100%'}}>
                        <Grid item container lg={12} p={2}>
                            <FormControl fullWidth>
                                <MInput
                                    popup
                                    label="عنوان متن ..."
                                    id="pass"
                                    name="pass"
                                    value={formik.values.pass}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.pass && Boolean(formik.errors.pass)}
                                    helperText={formik.touched.pass && formik.errors.pass}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item container lg={12} p={2}>
                            <FormControl fullWidth>
                                <MInput
                                    textarea
                                    label="متن خود را بنویسید ..."
                                    minRows={5}
                                    multiline
                                    id="phone"
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item container lg={12} justifyContent={'end'} p={2}>
                            <MTButton submite type="submit">
                                {loading ? "در حال ارسال..." : "ثبت "}
                            </MTButton>
                        </Grid>
                    </form>
                </Grid>
                {/*<Grid item container lg={10} boxShadow={5} mt={5} justifyContent={'space-evenly'} borderRadius={2} bgcolor={'white.main'}>*/}
                {/*    <Grid item container lg={12} p={2}>*/}
                {/*        <Grid item container lg={3} alignItems={'center'}>*/}
                {/*            <Typography variant={'h1'} p={0.5}>بنر صفحه اصلی </Typography>*/}
                {/*        </Grid>*/}
                {/*        <Grid item container lg={6}>*/}
                {/*            <Grid item container lg={4} flexDirection={'column'} justifyContent={'center'}*/}
                {/*                  alignItems={'center'}>*/}
                {/*                <Typography variant={'caption'} p={0}>انتخاب رنگ پس زمینه </Typography>*/}
                {/*                <Box sx={{*/}
                {/*                    padding: '5px',*/}
                {/*                    background: '#fff',*/}
                {/*                    borderRadius: '1px',*/}
                {/*                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',*/}
                {/*                    display: 'inline-block',*/}
                {/*                    cursor: 'pointer',*/}
                {/*                    marginLeft: 1*/}
                {/*                }} onClick={handleClickBackground}>*/}
                {/*                    <Box style={{...colorsss, backgroundColor: `${BackgroundColor}`}}></Box>*/}
                {/*                </Box>*/}
                {/*                {displayColorPickerBackgroundColor ? (*/}
                {/*                    <Box sx={{position: 'absolute', zIndex: '2',}}>*/}
                {/*                        <Box sx={{position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px',}}*/}
                {/*                             onClick={handleCloseBackground}></Box>*/}
                {/*                        <SketchPicker color={BackgroundColor} onChange={handleChangeBackground}/>*/}
                {/*                    </Box>*/}
                {/*                ) : null}*/}

                {/*            </Grid>*/}
                {/*            <Grid item container lg={4} flexDirection={'column'} justifyContent={'center'}*/}
                {/*                  alignItems={'center'}>*/}
                {/*                <Typography variant={'caption'}>انتخاب رنگ عنوان متن </Typography>*/}

                {/*                <Box sx={{*/}
                {/*                    padding: '5px',*/}
                {/*                    background: '#fff',*/}
                {/*                    borderRadius: '1px',*/}
                {/*                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',*/}
                {/*                    display: 'inline-block',*/}
                {/*                    cursor: 'pointer',*/}
                {/*                    marginLeft: 1*/}
                {/*                }} onClick={handleClickTitle}>*/}
                {/*                    <Box style={{...colorsss, backgroundColor: `${TitleColor}`}}></Box>*/}
                {/*                </Box>*/}
                {/*                {displayColorPickerTitleColor ? (*/}
                {/*                    <Box sx={{position: 'absolute', zIndex: '2',}}>*/}
                {/*                        <Box sx={{position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px',}}*/}
                {/*                             onClick={handleCloseTitle}></Box>*/}
                {/*                        <SketchPicker color={TitleColor} onChange={handleChangeTitle}/>*/}
                {/*                    </Box>*/}
                {/*                ) : null}*/}


                {/*            </Grid>*/}
                {/*            <Grid item container lg={4} flexDirection={'column'} justifyContent={'center'}*/}
                {/*                  alignItems={'center'}>*/}
                {/*                <Typography variant={'caption'}>انتخاب رنگ متن </Typography>*/}
                {/*                <Box sx={{*/}
                {/*                    padding: '5px',*/}
                {/*                    background: '#fff',*/}
                {/*                    borderRadius: '1px',*/}
                {/*                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',*/}
                {/*                    display: 'inline-block',*/}
                {/*                    cursor: 'pointer',*/}
                {/*                    marginLeft: 1*/}
                {/*                }} onClick={handleClickText}>*/}
                {/*                    <Box style={{...colorsss, backgroundColor: `${TextColor}`}}></Box>*/}
                {/*                </Box>*/}
                {/*                {displayColorPickerTextColor ? (*/}
                {/*                    <Box sx={{position: 'absolute', zIndex: '2'}}>*/}
                {/*                        <Box sx={{position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px',}}*/}
                {/*                             onClick={handleCloseText}></Box>*/}
                {/*                        <SketchPicker color={TextColor} onChange={handleChangeText}/>*/}
                {/*                    </Box>*/}
                {/*                ) : null}*/}
                {/*            </Grid>*/}
                {/*        </Grid>*/}
                {/*        <Grid item container lg={3} justifyContent={'center'} alignItems={'end'}>*/}
                {/*            <FormControl sx={{width: {lg: 250, xs: 220, md: 350}}}>*/}
                {/*                <Stack direction="row" alignItems="center" spacing={2}>*/}
                {/*                    {!uploadedFileName && (*/}
                {/*                        <MTButton*/}
                {/*                            selectimages*/}
                {/*                            sx={{*/}
                {/*                                width: "100%",*/}
                {/*                                height: "45px",*/}
                {/*                                boxShadow: "none",*/}
                {/*                            }}*/}
                {/*                            startIcon={<CloudUploadRoundedIcon/>}*/}
                {/*                            variant="contained"*/}
                {/*                            component="label"*/}
                {/*                        >*/}
                {/*                            <Typography variant={'h1'} color={'black.main'}>انتخاب عکس</Typography>*/}
                {/*                            <input*/}
                {/*                                hidden*/}
                {/*                                accept="image/*"*/}
                {/*                                multiple*/}
                {/*                                type="file"*/}
                {/*                                onChange={handleFileUploads}*/}
                {/*                            />*/}
                {/*                        </MTButton>*/}
                {/*                    )}*/}
                {/*                    {uploadedFileName && (*/}
                {/*                        <TextField*/}
                {/*                            variant="outlined"*/}
                {/*                            value={uploadedFileName}*/}
                {/*                            disabled*/}
                {/*                            sx={{*/}
                {/*                                width: "100%"*/}
                {/*                            }}*/}
                {/*                            InputProps={{*/}
                {/*                                startAdornment: (*/}
                {/*                                    <InputAdornment position="start">*/}
                {/*                                        <DescriptionRoundedIcon/>*/}
                {/*                                    </InputAdornment>*/}
                {/*                                ),*/}
                {/*                                endAdornment: (*/}
                {/*                                    <InputAdornment position="end">*/}
                {/*                                        <IconButton*/}
                {/*                                            aria-label="toggle password visibility"*/}
                {/*                                            onClick={handleClickClear}*/}
                {/*                                            edge="end"*/}
                {/*                                        >*/}
                {/*                                            <ClearIcon/>*/}
                {/*                                        </IconButton>*/}
                {/*                                    </InputAdornment>*/}
                {/*                                )*/}
                {/*                            }}*/}
                {/*                        />*/}
                {/*                    )}*/}
                {/*                </Stack>*/}
                {/*            </FormControl>*/}

                {/*        </Grid>*/}
                {/*    </Grid>*/}
                {/*    <form onSubmit={formik.handleSubmit} style={{width:'100%'}}>*/}
                {/*        <Grid item container lg={12} p={2}>*/}
                {/*            <FormControl fullWidth>*/}
                {/*                <MInput*/}
                {/*                    popup*/}
                {/*                    label="عنوان متن ..."*/}
                {/*                    id="pass"*/}
                {/*                    name="pass"*/}
                {/*                    value={formik.values.pass}*/}
                {/*                    onChange={formik.handleChange}*/}
                {/*                    onBlur={formik.handleBlur}*/}
                {/*                    error={formik.touched.pass && Boolean(formik.errors.pass)}*/}
                {/*                    helperText={formik.touched.pass && formik.errors.pass}*/}
                {/*                />*/}
                {/*            </FormControl>*/}
                {/*        </Grid>*/}
                {/*        <Grid item container lg={12} p={2}>*/}
                {/*            <FormControl fullWidth>*/}
                {/*                <MInput*/}
                {/*                    textarea*/}
                {/*                    label="متن خود را بنویسید ..."*/}
                {/*                    minRows={5}*/}
                {/*                    multiline*/}
                {/*                    id="phone"*/}
                {/*                    name="phone"*/}
                {/*                    value={formik.values.phone}*/}
                {/*                    onChange={formik.handleChange}*/}
                {/*                    onBlur={formik.handleBlur}*/}
                {/*                    error={formik.touched.phone && Boolean(formik.errors.phone)}*/}
                {/*                    helperText={formik.touched.phone && formik.errors.phone}*/}
                {/*                />*/}
                {/*            </FormControl>*/}
                {/*        </Grid>*/}
                {/*        <Grid item container lg={12} justifyContent={'end'} p={2}>*/}
                {/*            <MTButton submite type="submit">ثبت</MTButton>*/}
                {/*        </Grid>*/}
                {/*    </form>*/}
                {/*</Grid>*/}
                <Snackbar open={openMessage} autoHideDuration={4500}
                          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity={typeMessage as AlertColor} sx={{width: '100%'}}>
                        <Typography variant={'caption'}>{message}</Typography>
                    </Alert>
                </Snackbar>
            </Grid>


        </SettingLayout>
)
}
export default PageSetting
