import {
    Box,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    List,
    Modal,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import MTButton from "@/Components/Mbutton";
import AddIcon from "@mui/icons-material/Add";
import colors from "@/Assets/theme/base/colors";
import Image from "next/image";
import Edite from "@/Assets/images/nimbus_edit.svg";
import Trash from "@/Assets/images/circum_trash.svg";
import * as React from "react";
import {useEffect} from "react";
import FormControl from "@mui/material/FormControl";
import MInput from "@/Components/Minput";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import * as yup from "yup";
import {useFormik} from "formik";


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
    pass: yup.string().required('رمزعبور الزامی است'),
});
const Category=()=>{
    const [openMessage, setOpenMessage] = React.useState(false);

    const [typeMessage, setTypeMessage] = React.useState('')

    const [message, setMessage] = React.useState('')

    const [Category, setCategory] = React.useState<any[]>([]);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://farhangian.birkar.ir/api/Category/GetAll')
            const data = await response.json();
            setCategory(data);
        }
        getData()
    }, [Category]);



    const handleClose = () => setOpen(false);

    const handleOpenEdite = (item: any) => {
        setOpen(true)
    }
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

    const formiks = useFormik({
        initialValues: {
            pass: '',
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

                    const response = await axios.post(
                        'https://farhangian.birkar.ir/api/Category/Create',
                        {
                            "id": 0,
                            "categoryName": values.pass
                        },
                        config
                    );

                    if (response.status === 200) {
                        setMessage('با موفقیت اضافه شد');
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


    return(
        <>
            <Grid item container lg={10} p={2} justifyContent={'space-between'} alignItems={'center'} mt={2}>
                <Typography variant={'h1'} >دسته های موجود :</Typography>
                <MTButton onClick={handleOpenEdite} submite>  <AddIcon fontSize={'small'}/> اضافه کردن </MTButton>
            </Grid>
            <Grid item container  boxShadow={5} mt={2} borderRadius={2} lg={10} height={'50vh'} justifyContent={'center'} overflow={'auto'} >
                {Category.map((item:any)=>(
                    <>
                        <Grid item container lg={10} xs={10} maxHeight={'8vh'} minHeight={'8vh'}
                              bgcolor={'white.main'}
                              boxShadow={'1px 1px 10px 1px #C4C4C4'} my={1} borderRadius={1}
                              justifyContent={{
                                  lg: 'space-between',
                                  md: 'space-between',
                                  xs: 'space-between',
                              }} alignItems={'center'}>
                            <Grid item container lg={4} xs={12} justifyContent={'center'}
                                  alignItems={"center"}>
                                <Typography variant="h1" color={colors.yellow.main}>دسته
                                    : <span>{item.categoryName}</span> </Typography>
                            </Grid>

                            <Grid item container lg={2} xs={12} justifyContent={'center'} alignItems={"end"}
                            >
                                <Grid item container lg={4}>
                                    <Typography sx={{cursor: "pointer"}}
                                                // onClick={() => handleOpenEdite(item)}
                                                variant="h1" color={colors.red.main}><Image src={Edite} alt={'icons'}/>
                                        <span style={{color: colors.black.main}}></span></Typography>
                                </Grid>
                                <Grid item container lg={4}>
                                    <Typography sx={{cursor: "pointer"}} // onClick={() => handelDeleted(item.id)}
                                                variant="h1" color={colors.red.main}><Image src={Trash} alt={'icons'}/>
                                        <span style={{color: colors.black.main}}></span></Typography>
                                </Grid>

                            </Grid>
                        </Grid>
                    </>
                ))}
            </Grid>

            {/*AddCategory*/}
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
        </>
    )
}

export default Category
