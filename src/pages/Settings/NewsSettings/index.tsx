import SettingLayout from "@/Components/SettingLayout";
import {
    AlertColor, Box,
    Grid,
    IconButton,
    InputAdornment, InputLabel,
    List, Modal,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import * as React from "react";
import MInput from "@/Components/Minput";
import FormControl from "@mui/material/FormControl";
import MTButton from "@/Components/Mbutton";
import 'devextreme/dist/css/dx.light.css';

import {ColorBoxTypes} from 'devextreme-react/color-box';
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import ClearIcon from "@mui/icons-material/Clear";
import {useEffect, useState} from "react";
import colors from "@/Assets/theme/base/colors";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {CSSTransition} from "react-transition-group";
import {useTheme} from "@emotion/react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {useFormik} from "formik";
import * as yup from "yup";
import MBox from "@/Components/MBox";
import Mbutton from "@/Components/Mbutton";
import Edite from "@/Assets/images/nimbus_edit.svg";
import Image from "next/image";
import Trash from '@/Assets/images/circum_trash.svg'

const formValidationSchema = yup.object({
    title: yup.string().required('عنوان متن الزامی است'),
    description: yup.string().required('متن خود را بنویسید'),
});
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
const formValidationSchemas = yup.object({
    phone: yup.string().required('شماره موبایل الزامی است'),
    pass: yup.string().required('رمزعبور الزامی است'),
});
const PageSetting = () => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadedFileEdit, setUploadedFileEdit] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [uploadedFileNameEdit, setUploadedFileNameEdit] = useState('');
    const [ostan, setOstan] = React.useState<any[]>([]);
    const theme = useTheme();
    const [opens, setopens] = React.useState(false)
    const [Id, setID] = React.useState();
    const [openMessage, setOpenMessage] = React.useState(false);
    const [typeMessage, setTypeMessage] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [id, SetId] = React.useState()
    const [open, setOpen] = React.useState(false);
    const [EditData, setEditDate] = React.useState<any>()


    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://farhangian.birkar.ir/api/News/GetAll')
            const data = await response.json();
            setOstan(data.data);
        }
        getData()
    }, [ostan]);



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
    const handleCloseAlert = () => {
        setOpenMessage(false);
    };
    const [editingEnabled, setEditingEnabled] = useState(false); // State to control editing mode

    const handleClose = () => setOpen(false);
    const handelDeleted = (item: any) => {
        const Deleted = async () => {
            try {
                const response = await axios.delete(`https://farhangian.birkar.ir/api/News/Delete?id=${item}`,
                )
                if (response.status === 200) {
                    setMessage('حذف خبر مورد نظر با موفقیت انجام شد')
                    setTypeMessage('warning')
                    setOpenMessage(true)
                }
            } catch (error: any) {
                setTypeMessage('error')
                setOpenMessage(true)
                setMessage(error.message)
            }
        }
        Deleted()
    }
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        validationSchema: formValidationSchema,
        onSubmit: async (values) => {
            const Submite = async () => {
                const config = {
                    headers: {
                        'Content-type': 'multipart/form-data', // Change the content type for file uploads
                    },
                };

                try {
                    const formData = new FormData();
                    formData.append('title', values.title);
                    formData.append('description', values.description);

                    // Append the file directly to FormData
                    if (uploadedFile) {
                        formData.append('imagePath', uploadedFile);
                    }

                    const response = await axios.post(
                        'https://farhangian.birkar.ir/api/News/Create',
                        formData,
                        config
                    );

                    if (response.status === 200) {
                        handleFileReset();
                        setMessage('خبر جدید با موفقیت اضافه شد');
                        setTypeMessage('success');
                        setOpenMessage(true);
                        formik.resetForm();
                    }
                } catch (error: any) {
                    setTypeMessage('error');
                    setOpenMessage(true);
                    setMessage(error.message);
                }
            };

            Submite();
        },
    });


    const handleOpenEdite = (item: any) => {
        const getData = async () => {
            const response = await fetch(`https://farhangian.birkar.ir/api/News/GetById?id=${item.id}`)
            const data = await response.json();
            setEditDate(data.data)
        }
        getData()
        SetId(item.id)
        setOpen(true)
    }
    const handleEditDescription = (newDescription:any) => {
        setEditingEnabled(true)
        setEditDate ((prevEditData:any) => ({
            ...prevEditData,
            description: newDescription
        }));
    };
    const formiks = useFormik({
        initialValues: {
            phone: '',
            pass: '',
        },
        validationSchema: formValidationSchemas,
        onSubmit: (values) => {
            const Submite = async () => {
                const config = {
                    headers: {
                        'Content-type': 'multipart/form-data',
                    },
                };

                try {
                    const formData = new FormData();
                    formData.append('id', id ?? '');
                    formData.append('title', values.pass);
                    formData.append('description', values.phone);
                    if (uploadedFileEdit) {
                        formData.append('imagePath', uploadedFileEdit);
                    }

                    const response = await axios.put(
                        'https://farhangian.birkar.ir/api/News/Edit',
                        formData,
                        config
                    );

                    if (response.status === 200) {
                        handleFileResetEdit();
                        setMessage(' موفقیت ادیت شد');
                        setTypeMessage('success');
                        setOpenMessage(true);
                        formiks.resetForm();
                        setOpen(false)
                    }
                } catch (error: any) {
                    setTypeMessage('error');
                    setOpenMessage(true);
                    setMessage(error.message);
                }
            };

            Submite();
        },
    });


    return (
        <SettingLayout>
            <Grid item container lg={12} justifyContent={'center'} mt={2}>
                <Grid item container lg={11} boxShadow={5} justifyContent={'center'} borderRadius={2}
                      bgcolor={'white.main'}>
                    <Grid item container lg={10} mt={2}>
                        <Typography variant={'h1'}>اخبار های موجود :</Typography>
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
                                      }} alignItems={'end'}>
                                    <Grid item container lg={4} xs={12} justifyContent={'center'} mt={{lg: 2, xs: 2}}
                                          alignItems={"center"}>
                                        <Typography variant="h1" color={colors.yellow.main}> عنوان خبر
                                            : <span>{item.title?.slice(0, 20)}</span> </Typography>
                                    </Grid>

                                    <Grid item container lg={2} xs={12} justifyContent={'center'} alignItems={"end"}
                                          mt={{xs: 2}}>
                                        <Grid item container lg={4}>
                                            <Typography sx={{cursor: "pointer"}} onClick={() => handleOpenEdite(item)}
                                                        variant="h1" color={colors.red.main}><Image src={Edite}
                                                                                                    alt={'icons'}/>
                                                <span style={{color: colors.black.main}}></span></Typography>
                                        </Grid>
                                        <Grid item container lg={4}>
                                            <Typography sx={{cursor: "pointer"}} onClick={() => handelDeleted(item.id)}
                                                        variant="h1" color={colors.red.main}><Image src={Trash}
                                                                                                    alt={'icons'}/>
                                                <span style={{color: colors.black.main}}></span></Typography>
                                        </Grid>

                                    </Grid>

                                    <Grid item container m={0} mb={0} p={0} position={'relative'} lg={12}
                                          md={12} xs={12} sm={12} bgcolor={'white.main'}>
                                        <List sx={{width: '100%'}}>
                                            <CSSTransition key={item.id} in={Id === item.id && opens} timeout={300}
                                                           classNames="fade" unmountOnExit>
                                                <Grid item container justifyContent={'center'} lg={12} mt={2}
                                                      mb={0}>
                                                    <Grid item container lg={11}>
                                                        <Typography variant={'caption'} fontSize={'1rem'}
                                                                    textAlign={'justify'}>
                                                            {item.description?.slice(0, 250)} ...
                                                        </Typography>
                                                    </Grid>

                                                </Grid>
                                            </CSSTransition>
                                        </List>
                                    </Grid>
                                </Grid>

                            </>
                        ))}
                    </Grid>


                    <Grid item container lg={12} mt={10} overflow={'auto'}>
                        <Grid item container lg={3} alignItems={'center'}>
                            <Typography variant={'h1'} p={0.5}>افزدون اخبار جدید</Typography>
                        </Grid>
                        <form onSubmit={formik.handleSubmit} style={{width: '100%'}}>
                            <Grid item container lg={12} p={2}>
                                <FormControl fullWidth>
                                    <MInput
                                        textarea
                                        label="عنوان متن ..."
                                        minRows={0}
                                        multiline
                                        id="title"
                                        name="title"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.title && Boolean(formik.errors.title)}
                                        helperText={formik.touched.title && formik.errors.title}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item container lg={12} p={2}>
                                <FormControl sx={{width: {lg: '100%', xs: 220, md: 350}}}>
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
                            <Grid item container lg={12} p={2}>
                                <FormControl fullWidth>
                                    <MInput
                                        textarea
                                        label="متن خود را بنویسید ..."
                                        minRows={5}
                                        multiline
                                        id="description"
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                        helperText={formik.touched.description && formik.errors.description}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item container lg={12} justifyContent={'end'} p={2}>
                                <MTButton submite type="submit">ثبت</MTButton>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} width={{lg:800}}>
                        <Grid item container m={0} mb={0} p={0} position={'relative'} lg={12}
                              md={12} xs={12} sm={12} bgcolor={'white.main'}>
                            <List sx={{width: '100%'}}>

                                <form onSubmit={formiks.handleSubmit} style={{width: '100%'}}>
                                    <Grid item container lg={12} p={2}>

                                        <FormControl fullWidth>
                                            <InputLabel sx={{marginTop:"-15px",
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
                                                id="pass"
                                                name="pass"
                                                value={formiks.values.pass}
                                                onChange={formiks.handleChange}
                                                onBlur={formiks.handleBlur}
                                                error={formiks.touched.pass && Boolean(formiks.errors.pass)}
                                                helperText={formiks.touched.pass && formiks.errors.pass}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item container lg={12} p={2}>
                                        <FormControl sx={{width: {lg: '100%', xs: 220, md: 350}}}>
                                            <InputLabel sx={{marginTop:"-15px", fontFamily: 'Yekan Bakh Medium', fontSize: "1.2rem", fontWeight: "bold !important", color: colors.black.main + "!important",}} shrink htmlFor="bootstrap-input">
                                            </InputLabel>
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                {!uploadedFileNameEdit && (
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
                                                        <Typography variant={'h1'} color={'black.main'}>انتخاب
                                                            عکس</Typography>
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
                                                                    <DescriptionRoundedIcon/>
                                                                </InputAdornment>
                                                            ),
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={handleClickClearEdit}
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

                                    <Grid item container lg={12} p={2}>
                                        <FormControl fullWidth>
                                            <InputLabel sx={{marginTop:"-15px",
                                                fontFamily: 'Yekan Bakh Medium',
                                                fontSize: "1.2rem",
                                                fontWeight: "bold !important",
                                                color: colors.black.main + "!important",

                                            }} shrink htmlFor="bootstrap-input">
                                                متن شما  :
                                            </InputLabel>
                                            <MInput
                                                textarea
                                                minRows={5}
                                                multiline
                                                id="phone"
                                                name="phone"
                                                value={formiks.values.phone}
                                                onChange={formiks.handleChange}
                                                onBlur={formiks.handleBlur}
                                                error={formiks.touched.phone && Boolean(formiks.errors.phone)}
                                                helperText={formiks.touched.phone && formiks.errors.phone}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item container lg={12} justifyContent={'end'} p={2}>
                                        <MTButton submite type="submit">ثبت</MTButton>
                                    </Grid>
                                </form>



                                {/*<form style={{ width: '100%' }}>*/}
                                {/*    <FormControl fullWidth>*/}
                                {/*        <MInput*/}
                                {/*            textarea*/}
                                {/*            label="عنوان متن ..."*/}
                                {/*            minRows={0}*/}
                                {/*            multiline*/}
                                {/*            id="pass"*/}
                                {/*            name="pass"*/}
                                {/*            value={formiks.values.pass || (EditData ? EditData.title : '')}*/}
                                {/*            onChange={formiks.handleChange}*/}
                                {/*            onBlur={formiks.handleBlur}*/}
                                {/*            error={formiks.touched.pass && Boolean(formiks.errors.pass)}*/}
                                {/*            helperText={formiks.touched.pass && formiks.errors.pass}*/}
                                {/*        />*/}
                                {/*        /!* Button to update the title *!/*/}
                                {/*        /!*<MTButton onClick={() => handleEditTitle(formiks.values.pass)}>ویرایش عنوان</MTButton>*!/*/}
                                {/*    </FormControl>*/}
                                {/*    <FormControl fullWidth>*/}
                                {/*        <MInput*/}
                                {/*            textarea*/}
                                {/*            label="متن خود را بنویسید ..."*/}
                                {/*            minRows={5}*/}
                                {/*            multiline*/}
                                {/*            id="phone"*/}
                                {/*            name="phone"*/}
                                {/*            value={formiks.values.phone || (EditData ? EditData.description : '')}*/}
                                {/*            onChange={formiks.handleChange}*/}
                                {/*            onBlur={formiks.handleBlur}*/}
                                {/*            error={formiks.touched.phone && Boolean(formiks.errors.phone)}*/}
                                {/*            helperText={formiks.touched.phone && formiks.errors.phone}*/}
                                {/*        disabled={!editingEnabled}*/}

                                {/*        />*/}
                                {/*        /!* Button to update the description *!/*/}
                                {/*        <MTButton onClick={() => handleEditDescription(formiks.values.phone)}>ویرایش متن</MTButton>*/}
                                {/*    </FormControl>*/}
                                {/*    <Grid item container lg={12} justifyContent={'end'} p={2}>*/}
                                {/*        <MTButton type="submit">ثبت</MTButton>*/}
                                {/*    </Grid>*/}
                                {/*</form>*/}
                            </List>
                        </Grid>
                    </Box>
                </Modal>

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
