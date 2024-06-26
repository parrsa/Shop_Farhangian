import SettingLayout from "@/Components/SettingLayout";
import {
    AlertColor, Box,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel, List, Modal,
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

const eventHandlingLabel = { 'aria-label': 'Event Handling' };
const formValidationSchemas = yup.object({
});
import { ColorBox, ColorBoxTypes } from 'devextreme-react/color-box';
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import ClearIcon from "@mui/icons-material/Clear";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import colors from "@/Assets/theme/base/colors";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { CSSTransition } from "react-transition-group";
import Mbutton from "@/Components/Mbutton";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { SketchPicker } from "react-color";
import Image from "next/image";
import Edite from "@/Assets/images/nimbus_edit.svg";
import Trash from "@/Assets/images/circum_trash.svg";
import url from '@/Api';

import Banner from "@/pages/Settings/PageSetting/[Banner]";
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

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'background.paper',
    boxShadow: 24,
    borderRadius: 1,
    p: 4,
};
const PageSetting = () => {
    const [openMessage, setOpenMessage] = React.useState(false);
    const [typeMessage, setTypeMessage] = React.useState('')
    const [showVerify, setshowVerify] = React.useState(false);
    const [message, setMessage] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false);
    const [color, setColor] = React.useState('#f05b41');
    const handleColorChange = React.useCallback(({ value }: ColorBoxTypes.ValueChangedEvent) => {
        setColor(value);
    }, []);
    const [uploadedFileName, setUploadedFileName] = React.useState("");
    const [files, setFiles] = React.useState<File | undefined>(undefined);
    const [ostan, setOstan] = React.useState<any[]>([]);
    const [uploadedFile, setUploadedFile] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`${url}/api/Advertisement/GetAll`)
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
    const handleChangeComplete = (color: any) => {
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
    const [TitleColor, SetTitleColor] = React.useState('400606')
    const handleChangeTitle = (newColor: any) => {
        SetTitleColor(newColor.hex)

    }
    const handleClickTitle = () => {
        setDisplayColorPickerTitleColor(!displayColorPickerTitleColor);
    };

    const handleCloseTitle = () => {
        setDisplayColorPickerTitleColor(false);
    };





    // Chose TextColor
    const [displayColorPickerTextColor, setDisplayColorPickerTextColor] = React.useState(false);
    const [TextColor, SetTextColor] = React.useState('400606')

    const handleChangeText = (newColor: any) => {
        SetTextColor(newColor.hex)
    }
    const handleClickText = () => {
        setDisplayColorPickerTextColor(!displayColorPickerTextColor);
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
    const handleFileUploads = (event: any) => {
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

                    const response = await axios.post(`${url}/api/Advertisement/Create`,
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

    const handelDeleted = (item: any) => {
        const Deleted = async () => {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${Cook}`,
                }
            }
            try {
                const response = await axios.delete(`${url}/api/Advertisement/Delete?id=${item}`,
                    config
                )
                if (response.status === 200) {
                    setMessage('تبلیغ شما با موفقیت حذف شد')
                    setTypeMessage('warning')
                    setOpenMessage(true)
                }
            } catch (error: any) {
                setTypeMessage('error')
                setOpenMessage(true)
                setMessage(error.response.data.message)
            }
        }
        Deleted()
    }
    // const [open, setopen] = React.useState(false)
    const [Id, setID] = React.useState();
    const handleAddFruit = (item: any) => {
        setID(item);
        // setopen(!open);
    };



    const [id, SetId] = React.useState()
    const [EditData, setEditDate] = React.useState<any>()
    const [uploadedFileNameEdit, setUploadedFileNameEdit] = useState('');
    const [uploadedFileEdit, setUploadedFileEdit] = useState(null);

    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    const handleOpenEdite = (item: any) => {
        const getData = async () => {
            try {
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${Cook}`,
                    },
                };
                const response = await fetch(`${url}/api/Advertisement/GetById?id=${item}`, config)
                const data = await response.json();
                setEditDate(data.data)
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }
        getData()
        SetId(item)
        setOpen(true)
    }


    const [profile, setProfile] = useState({
        title: '',
    });
    React.useMemo(() => {
        setProfile({ 'title': EditData?.title })
    }, [EditData])

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            title: e.target.value
        }));
    };

    const [profiles, setProfiles] = useState({
        description: '',
    });
    React.useMemo(() => {
        setProfiles({ 'description': EditData?.description })
    }, [EditData])

    const handleFileUploadsEdit = (event: any) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const file = files[0];
            setUploadedFileEdit(file);
            setUploadedFileNameEdit(file.name);
        }
    };
    const handleFileResetEdit = () => {
        setUploadedFileEdit(null);
        setUploadedFileNameEdit('');
    };
    const handleClickClearEdit = () => {
        setUploadedFileEdit(null);
        setUploadedFileNameEdit('');
    };
    const handleChanged = (e: any) => {
        const { name, value } = e.target;
        setProfiles(prevProfile => ({
            description: e.target.value
        }));
    };



    // Chose BackgroundColorEdit
    const [displayColorPickerBackgroundColorEdit, setDisplayColorPickerBackgroundColorEdit] = React.useState(false);
    const [BackgroundColorEdit, SetBackgroundColorEdit] = React.useState('400606')

    const handleChangeBackgroundEdit = (newColor: any) => {
        SetBackgroundColorEdit(newColor.hex)
    }
    const handleClickBackgroundEdit = () => {
        setDisplayColorPickerBackgroundColorEdit(!displayColorPickerBackgroundColorEdit);
    };

    const handleCloseBackgroundEdit = () => {
        setDisplayColorPickerBackgroundColorEdit(false);
    };



    // Chose TitleColor
    const [displayColorPickerTitleColorEdit, setDisplayColorPickerTitleColorEdit] = React.useState(false);
    const [TitleColorEdit, SetTitleColorEdit] = React.useState('400606')

    const handleChangeTitleEdit = (newColor: any) => {
        SetTitleColorEdit(newColor.hex)
    }
    const handleClickTitleEdit = () => {
        setDisplayColorPickerTitleColorEdit(!displayColorPickerBackgroundColorEdit);
    };

    const handleCloseTitleEdit = () => {
        setDisplayColorPickerTitleColorEdit(false);
    };



    // Chose TextColor
    const [displayColorPickerTextColorEdit, setDisplayColorPickerTextColorEdit] = React.useState(false);
    const [TextColorEdit, SetTextColorEdit] = React.useState('400606')

    const handleChangeTextEdit = (newColor: any) => {
        SetTextColorEdit(newColor.hex)
    }
    const handleClickTextEdit = () => {
        setDisplayColorPickerTextColorEdit(!displayColorPickerBackgroundColorEdit);
    };

    const handleCloseTextEdit = () => {
        setDisplayColorPickerTextColorEdit(false);
    };

    const formiksEdit = useFormik({
        initialValues: {
            phone: '',
        },
        validationSchema: formValidationSchemas,
        onSubmit: (values) => {
            const Submite = async () => {
                const config = {
                    headers: {
                        'Content-type': 'multipart/form-data',
                        'Authorization': `Bearer ${Cook}`,

                    },
                };

                try {
                    const formData = new FormData();
                    setLoading(true)
                    formData.append('Id', id ?? '');
                    formData.append('Title', profile.title);
                    formData.append('Description', profiles.description);
                    formData.append('BackgroundColor', BackgroundColorEdit);
                    formData.append('DesForeColor', TextColorEdit);
                    formData.append('TitleForeColor', TitleColorEdit);
                    if (uploadedFileEdit) {
                        formData.append('Image', uploadedFileEdit);
                    }

                    const response = await axios.put(
                        `${url}/api/Advertisement/Edit`,
                        formData,
                        config
                    );

                    if (response.status === 200) {
                        handleFileResetEdit();
                        setMessage(' با موفقیت ادیت شد');
                        setTypeMessage('success');
                        setOpenMessage(true);
                        formiksEdit.resetForm();
                        setOpen(false)
                        setLoading(false)

                    }
                } catch (error: any) {
                    setTypeMessage('error');
                    setOpenMessage(true);
                    setMessage(error.message);
                    setLoading(false)
                }
            };

            Submite();
        },
    });


    return (
        <SettingLayout>
            <Grid item container lg={12} justifyContent={'center'} mt={2}>

                <Grid item container lg={10} boxShadow={5} justifyContent={'center'} borderRadius={2}
                    bgcolor={'white.main'}>
                    <Grid item container lg={10} mt={2}>
                        <Typography variant={'h1'} >تبلیغات موجود :</Typography>
                    </Grid>
                    <Grid item container lg={12} maxHeight={'50vh'} minHeight={'50vh'} justifyContent={'center'}
                        overflow={'auto'}>
                        {ostan.map((item: any) => (
                            <>
                                <Grid item container lg={10} xs={10} maxHeight={'8vh'} minHeight={'8vh'}
                                    bgcolor={'white.main'}
                                    boxShadow={'1px 1px 10px 1px #C4C4C4'} my={1} borderRadius={1}
                                    justifyContent={{
                                        lg: 'space-between',
                                        md: 'space-between',
                                        xs: 'space-between',
                                    }} alignItems={'start'}>
                                    <Grid item container lg={4} xs={12} justifyContent={'center'} mt={{ lg: 2, xs: 2 }} alignItems={"center"}>
                                        <Typography variant="h1" color={colors.yellow.main}> عنوان : <span>{item.title?.slice(0, 20)}</span> </Typography>
                                    </Grid>

                                    {/*<img src={`https://farhangian.birkar.ir/${item.image}`} />*/}
                                    {/*<Image fill src={`https://farhangian.birkar.ir${item.image}`}  alt={'icon'} width={300} height={300} />*/}
                                    <Grid item container lg={2} xs={12} justifyContent={'center'} alignItems={"center"}
                                        mt={{ xs: 2 }}>
                                        <Grid item container lg={4}>
                                            <Typography sx={{ cursor: "pointer" }} onClick={() => handleOpenEdite(item.id)} variant="h1" color={colors.red.main}><Image src={Edite} alt={'icons'} />
                                                <span style={{ color: colors.black.main }}></span></Typography>
                                        </Grid>
                                        <Grid item container lg={4}>
                                            <Typography sx={{ cursor: "pointer" }} onClick={() => handelDeleted(item.id)} variant="h1" color={colors.red.main}><Image src={Trash} alt={'icons'} />
                                                <span style={{ color: colors.black.main }}></span></Typography>
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
                            <Grid item container lg={4} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
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
                                    <Box style={{ ...colorsss, backgroundColor: `${BackgroundColor}` }}></Box>
                                </Box>
                                {displayColorPickerBackgroundColor ? (
                                    <Box sx={{ position: 'absolute', zIndex: '2', }}>
                                        <Box sx={{ position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px', }}
                                            onClick={handleCloseBackground}></Box>
                                        <SketchPicker color={BackgroundColor} onChange={handleChangeBackground} />
                                    </Box>
                                ) : null}

                            </Grid>
                            <Grid item container lg={4} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
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
                                    <Box style={{ ...colorsss, backgroundColor: `${TitleColor}` }}></Box>
                                </Box>
                                {displayColorPickerTitleColor ? (
                                    <Box sx={{ position: 'absolute', zIndex: '2', }}>
                                        <Box sx={{ position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px', }}
                                            onClick={handleCloseTitle}></Box>
                                        <SketchPicker color={TitleColor} onChange={handleChangeTitle} />
                                    </Box>
                                ) : null}


                            </Grid>
                            <Grid item container lg={4} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
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
                                    <Box style={{ ...colorsss, backgroundColor: `${TextColor}` }}></Box>
                                </Box>
                                {displayColorPickerTextColor ? (
                                    <Box sx={{ position: 'absolute', zIndex: '2' }}>
                                        <Box sx={{ position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px', }}
                                            onClick={handleCloseText}></Box>
                                        <SketchPicker color={TextColor} onChange={handleChangeText} />
                                    </Box>
                                ) : null}
                            </Grid>
                        </Grid>
                        <Grid item container lg={3} justifyContent={'center'} alignItems={'end'}>
                            <FormControl sx={{ width: { lg: 250, xs: 220, md: 350 } }}>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    {!uploadedFileName && (
                                        <MTButton
                                            selectimages
                                            sx={{
                                                width: "100%",
                                                height: "45px",
                                                boxShadow: "none",
                                            }}
                                            startIcon={<CloudUploadRoundedIcon />}
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
                                                        <DescriptionRoundedIcon />
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickClear}
                                                            edge="end"
                                                        >
                                                            <ClearIcon />
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
                    <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
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

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} width={{ lg: 1000 }}>
                        <Grid item container m={0} mb={0} p={0} position={'relative'} lg={12}
                            md={12} xs={12} sm={12} bgcolor={'white.main'}>
                            <List sx={{ width: '100%' }}>
                                <Grid item container lg={12} p={2} sx={{ color: 'black.main' }}>
                                    <Grid item container lg={3} alignItems={'center'}>
                                        <Typography variant={'h1'} p={0.5}>نوار تبلیغاتی صفحه اصلی </Typography>
                                    </Grid>
                                    <Grid item container lg={6}>
                                        <Grid item container lg={4} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                            <Typography variant={'caption'} p={0}>انتخاب رنگ پس زمینه </Typography>
                                            <Box sx={{
                                                padding: '5px',
                                                background: '#fff',
                                                borderRadius: '1px',
                                                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                                                display: 'inline-block',
                                                cursor: 'pointer',
                                                marginLeft: 1
                                            }} onClick={handleClickBackgroundEdit}>
                                                <Box style={{ ...colorsss, backgroundColor: `${BackgroundColorEdit}` }}></Box>
                                            </Box>
                                            {displayColorPickerBackgroundColorEdit ? (
                                                <Box sx={{ position: 'absolute', zIndex: '2', }}>
                                                    <Box sx={{ position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px', }}
                                                        onClick={handleCloseBackgroundEdit}></Box>
                                                    <SketchPicker color={BackgroundColorEdit} onChange={handleChangeBackgroundEdit} />
                                                </Box>
                                            ) : null}

                                        </Grid>
                                        <Grid item container lg={4} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                            <Typography variant={'caption'}>انتخاب رنگ عنوان متن </Typography>

                                            <Box sx={{
                                                padding: '5px',
                                                background: '#fff',
                                                borderRadius: '1px',
                                                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                                                display: 'inline-block',
                                                cursor: 'pointer',
                                                marginLeft: 1
                                            }} onClick={handleClickTitleEdit}>
                                                <Box style={{ ...colorsss, backgroundColor: `${TitleColorEdit}` }}></Box>
                                            </Box>
                                            {displayColorPickerTitleColorEdit ? (
                                                <Box sx={{ position: 'absolute', zIndex: '2', }}>
                                                    <Box sx={{ position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px', }}
                                                        onClick={handleCloseTitleEdit}></Box>
                                                    <SketchPicker color={TitleColorEdit} onChange={handleChangeTitleEdit} />
                                                </Box>
                                            ) : null}


                                        </Grid>
                                        <Grid item container lg={4} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                            <Typography variant={'caption'}>انتخاب رنگ متن </Typography>
                                            <Box sx={{
                                                padding: '5px',
                                                background: '#fff',
                                                borderRadius: '1px',
                                                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                                                display: 'inline-block',
                                                cursor: 'pointer',
                                                marginLeft: 1
                                            }} onClick={handleClickTextEdit}>
                                                <Box style={{ ...colorsss, backgroundColor: `${TextColorEdit}` }}></Box>
                                            </Box>
                                            {displayColorPickerTextColorEdit ? (
                                                <Box sx={{ position: 'absolute', zIndex: '2' }}>
                                                    <Box sx={{ position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px', }}
                                                        onClick={handleCloseTextEdit}></Box>
                                                    <SketchPicker color={TextColorEdit} onChange={handleChangeTextEdit} />
                                                </Box>
                                            ) : null}
                                        </Grid>
                                    </Grid>
                                    <Grid item container lg={3} justifyContent={'center'} alignItems={'end'}>
                                        <FormControl sx={{ width: { lg: 250, xs: 220, md: 350 } }}>
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                {!uploadedFileNameEdit && (
                                                    <MTButton
                                                        selectimages
                                                        sx={{
                                                            width: "100%",
                                                            height: "45px",
                                                            boxShadow: "none",
                                                        }}
                                                        startIcon={<CloudUploadRoundedIcon />}
                                                        variant="contained"
                                                        component="label"
                                                    >
                                                        <Typography variant={'h1'} color={'black.main'}>انتخاب عکس</Typography>
                                                        <input
                                                            hidden
                                                            accept="image/*"
                                                            multiple
                                                            type="file"
                                                            onChange={handleFileUploadsEdit}
                                                        />
                                                    </MTButton>
                                                )}
                                                {uploadedFileNameEdit && (
                                                    <TextField
                                                        variant="outlined"
                                                        value={uploadedFileNameEdit}
                                                        disabled
                                                        sx={{
                                                            width: "100%"
                                                        }}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <DescriptionRoundedIcon />
                                                                </InputAdornment>
                                                            ),
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={handleClickClear}
                                                                        edge="end"
                                                                    >
                                                                        <ClearIcon />
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
                                <form onSubmit={formiksEdit.handleSubmit} style={{ width: '100%' }}>
                                    <Grid item container lg={12} p={2} sx={{ color: 'black.main' }}>
                                        <FormControl fullWidth>
                                            <InputLabel sx={{
                                                marginTop: "-15px",
                                                fontFamily: 'Yekan Bakh Medium',
                                                fontSize: "1.2rem",
                                                fontWeight: "bold !important",
                                                color: colors.black.main + "!important",

                                            }} shrink htmlFor="bootstrap-input">
                                                عنوان متن :
                                            </InputLabel>
                                            <MInput
                                                textarea
                                                minRows={0}
                                                multiline
                                                name="email"
                                                value={profile?.title}
                                                // value={`${EditData?.title || ''}${formiks.values.pass || ''}`}
                                                onChange={handleChange}
                                                onBlur={formiksEdit.handleBlur}
                                            // error={formiks.touched.pass && Boolean(formiks.errors.pass)}
                                            // helperText={formiks.touched.pass && formiks.errors.pass}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item container lg={12} p={2}>
                                        <FormControl fullWidth>
                                            <InputLabel sx={{
                                                marginTop: "-15px",
                                                fontFamily: 'Yekan Bakh Medium',
                                                fontSize: "1.2rem",
                                                fontWeight: "bold !important",
                                                color: colors.black.main + "!important",

                                            }} shrink htmlFor="bootstrap-input">
                                                متن شما :
                                            </InputLabel>
                                            <MInput
                                                textarea
                                                minRows={5}
                                                maxRows={5}
                                                multiline
                                                id="phone"
                                                name="phone"
                                                value={profiles.description}
                                                onChange={handleChanged}
                                                onBlur={formiksEdit.handleBlur}
                                                error={formiksEdit.touched.phone && Boolean(formiksEdit.errors.phone)}
                                                helperText={formiksEdit.touched.phone && formiksEdit.errors.phone}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item container lg={12} justifyContent={'end'} p={2}>
                                        <MTButton submite type="submit">                            {loading ? "در حال ارسال..." : "ثبت تغییرات"}
                                        </MTButton>
                                    </Grid>
                                </form>
                            </List>
                        </Grid>
                    </Box>
                </Modal>

                <Banner />
                <Snackbar open={openMessage} autoHideDuration={4500}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity={typeMessage as AlertColor} sx={{ width: '100%' }}>
                        <Typography variant={'caption'}>{message}</Typography>
                    </Alert>
                </Snackbar>
            </Grid>


        </SettingLayout>
    )
}
export default PageSetting
