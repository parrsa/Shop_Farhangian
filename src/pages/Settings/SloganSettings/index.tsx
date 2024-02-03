import SettingLayout from "@/Components/SettingLayout";
import {
    AlertColor, Box,
    Grid, IconButton, InputAdornment, List, Modal, Stack, TextField, Typography,
} from "@mui/material";
import * as React from "react";
import MInput from "@/Components/Minput";
import FormControl from "@mui/material/FormControl";
import MTButton from "@/Components/Mbutton";
import 'devextreme/dist/css/dx.light.css';
import {useFormik} from "formik";
import * as yup from "yup";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {ColorBoxTypes} from "devextreme-react/color-box";
import colors from "@/Assets/theme/base/colors";
import {useEffect, useState} from "react";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import ClearIcon from "@mui/icons-material/Clear";
const formValidationSchema = yup.object({
    phone: yup.string().required('متن شعار الزامی است'),
});

const formValidationSchemas = yup.object({
    phone: yup.string().required('شماره موبایل الزامی است'),
});

let alertColor: AlertColor | undefined;
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'background.paper',
    boxShadow: 24,
    borderRadius:1,
    p: 4,
};
const PageSetting = () => {
    const [ostan, setOstan] = React.useState<any[]>([]);
    const [color, setColor] = React.useState('#f05b41');
    const handleColorChange = React.useCallback(({value}: ColorBoxTypes.ValueChangedEvent) => {
        setColor(value);
    }, []);
    const [uploadedFileName, setUploadedFileName] = React.useState("");
    const [files, setFiles] = React.useState<File | undefined>(undefined);
    const [openMessage, setOpenMessage] = React.useState(false);
    const [typeMessage, setTypeMessage] = React.useState('')
    const [message, setMessage] = React.useState('')
    const handleClickClear = () => {
        setUploadedFileName("");
    };

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://farhangian.birkar.ir/api/Slogan/GetAll')
            const data = await response.json();
            setOstan(data.data);
        }
        getData()
    }, [ostan]);



    const handleFileUploads = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const fileName = file.name;
            setUploadedFileName(fileName);
            setFiles(files[0])
        }
    };

    const formik = useFormik({
        initialValues: {
            phone: '',
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
                    const response = await axios.post(`https://farhangian.birkar.ir/api/Slogan/Create
`,
                        {
                            id:0,
                            title: values.phone,
                        },
                        config
                    )
                    if (response.status === 200) {
                        setMessage('شعار شما با موفقیت ثبت شد')
                        setTypeMessage('success')
                        setOpenMessage(true)
                        formik.resetForm();
                        setTimeout(() => {
                            // navigate('/')
                        }, 2000)
                    }
                } catch (error:any) {
                    setTypeMessage('error')
                    setOpenMessage(true)
                    setMessage(error.message)
                }
            }
            login();
        },
    });


    const handleCloseAlert = () => {
        setOpenMessage(false);
    };

    const handelDeleted=(item:any)=>{
        const Deleted = async () => {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                }
            }
            try {
                const response = await axios.delete(`https://farhangian.birkar.ir/api/Slogan/Delete?id=${item}`,

                )
                if (response.status === 200) {
                    setMessage('حذف خبر مورد نظر با موفقیت انجام شد')
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
    const [opens, setopens] = React.useState(false)
    const [Id, setID] = React.useState();
    const [Descr,SetDescr]=React.useState()
    const [id,SetId]=React.useState()
    const [open, setOpen] = React.useState(false);

    const handleOpen = (item:any)=>{
        SetDescr(item.title)
        SetId(item.id)
        setOpen(true)
    }

    const handleClose = () => setOpen(false);
    const formiks = useFormik({
        initialValues: {
            phone: '',
        },
        validationSchema: formValidationSchemas,
        onSubmit: (values) => {
            const Submite = async () => {
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                    },
                };

                try {
                    const response = await axios.put(
                        'https://farhangian.birkar.ir/api/Slogan/Edit',
                        {
                            'id':id,
                            'title':values.phone
                        },
                        config
                    );

                    if (response.status === 200) {
                        setMessage('خبر جدید با موفقیت اضافه شد');
                        setTypeMessage('success');
                        setOpenMessage(true);
                        setOpen(false)
                        formik.resetForm();
                    }
                } catch (error:any) {
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
                <Grid item container lg={10} boxShadow={5} justifyContent={'space-evenly'} borderRadius={2}
                      bgcolor={'white.main'}>

                    <Grid item container lg={10}  mt={2}>
                        <Typography variant={'h1'} >شعار های موجود :</Typography>
                    </Grid>
                    <Grid item container  boxShadow={5} mt={2} borderRadius={2} lg={10} height={'50vh'} justifyContent={'center'} overflow={'auto'} >
                        {ostan.map((item:any)=>(
                            <>
                                <Grid item container lg={10} xs={10} bgcolor={'white.main'}
                                      boxShadow={'1px 1px 10px 1px #C4C4C4'} my={2} maxHeight={'10vh'} minHeight={'10vh'} borderRadius={1}
                                      justifyContent={{
                                          lg: 'space-between',
                                          md: 'space-between',
                                          xs: 'space-between'
                                      }} alignItems={'center'}>
                                    <Grid item container lg={4} xs={12}  justifyContent={'center'} p={1} alignItems={"center"}>
                                        <Typography variant="h1" color={colors.yellow.main}>{item.title.slice(0,25)}</Typography>
                                    </Grid>

                                    <Grid item container lg={4} xs={12}  justifyContent={'center'} p={1} >
                                        <Grid item container lg={4} >
                                            <Typography sx={{cursor: "pointer"}}  variant="h1"  onClick={() => handleOpen(item)} color={colors.red.main}>ویرایش <span style={{color: colors.black.main}}></span></Typography>
                                        </Grid>
                                        <Grid item container lg={4}>
                                            <Typography sx={{cursor: "pointer"}} onClick={() => handelDeleted(item.id)} variant="h1" color={colors.red.main}>حذف<span style={{color: colors.black.main}}></span></Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </>
                        ))}
                    </Grid>


                    <form onSubmit={formik.handleSubmit} style={{width: '100%'}}>
                        <Grid item container lg={12} p={2}>
                            <FormControl fullWidth>
                                <MInput
                                    textarea
                                    minRows={5}
                                    multiline
                                    id="phone"
                                    name="phone"
                                    type={'text'}
                                    label={"متن شعار"}
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item container justifyContent={"center"} p={2}
                              lg={12} md={12}>
                            <MTButton submite type="submit">ثبت</MTButton>
                        </Grid>
                    </form>
                </Grid>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Grid item container m={0} mb={0} p={0} position={'relative'} lg={12}
                              md={12} xs={12} sm={12} bgcolor={'white.main'} >
                            <List sx={{width: '100%'}}>
                                    <form onSubmit={formiks.handleSubmit}>
                                    <Grid item container lg={12} p={2}>
                                        <FormControl fullWidth>
                                            <MInput
                                                textarea
                                                label="عنوان متن ..."
                                                minRows={0}
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