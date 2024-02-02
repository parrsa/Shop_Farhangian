import SettingLayout from "@/Components/SettingLayout";
import {
    AlertColor,
    Divider,
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
import {useEffect} from "react";
import colors from "@/Assets/theme/base/colors";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {CSSTransition} from "react-transition-group";
import Mbutton from "@/Components/Mbutton";
import {useTheme} from "@emotion/react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const defaultModeLabel = {'aria-label': 'Default mode'};

const PageSetting = () => {
    const [color, setColor] = React.useState('#f05b41');
    const handleColorChange = React.useCallback(({value}: ColorBoxTypes.ValueChangedEvent) => {
        setColor(value);
    }, []);
    const [uploadedFileName, setUploadedFileName] = React.useState("");
    const [files, setFiles] = React.useState<File | undefined>(undefined);
    const [soran, setSoran] = React.useState<any>(0)
    const [ostan, setOstan] = React.useState<any[]>([]);

    const handleClickClear = () => {
        setUploadedFileName("");
    };

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://farhangian.birkar.ir/News/GetAllNews')
            const data = await response.json();
            setOstan(data);
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
    const theme = useTheme();
    const [fruitsInBasket, setFruitsInBasket] = React.useState<any[]>([]);
    const [open, setopen] = React.useState(false)
    const [Id, setID] = React.useState();
    const items = ostan.map((item) => item.id);
    const [title,SetTitle]=React.useState()
    const [Texts,setTexts]=React.useState()
    const [openMessage, setOpenMessage] = React.useState(false);
    const [typeMessage, setTypeMessage] = React.useState('')
    const [showVerify, setshowVerify] = React.useState(false);
    const [message, setMessage] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false);
    const shouldShowTransition = items.includes(Id) && open;
    const handleAddFruit = (item: any) => {
        setID(item);
        setopen(!open);
    };

    const handelDeleted=(item:any)=>{
        const login = async () => {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                }
            }
            try {
                const response = await axios.delete(`https://farhangian.birkar.ir/News/Delete?id=${item}`,

                )
                if (response.status === 200) {
                    alert('ok')
                    // setMessage('شعار شما با موفقیت ثبت شد')
                    // setTypeMessage('success')
                    // setOpenMessage(true)
                    // setTimeout(() => {
                    //     // navigate('/')
                    // }, 2000)
                }
            } catch (error:any) {
                alert('no')
                // setTypeMessage('error')
                // setOpenMessage(true)
                // setMessage(error.message)
            }
        }
        login()
    }

    // const handleRemoveFruit = (item: any) => {
    //     console.log(item)
    //     setFruitsInBasket((prev) => prev.filter((i) => i !== item));
    //     setopen(false)
    // };
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const login = async () => {
        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }
        try {
            const response = await axios.post(`https://farhangian.birkar.ir/News/Create`,
                {
                    "title": title,
                    "description": Texts,
                    "image": Texts,
                    "id": 0
                },
                config
            )
            if (response.status === 200) {
                setMessage('خبر جدید با موفقیت اضافه شد')
                setTypeMessage('success')
                setOpenMessage(true)
                // setTimeout(() => {
                //     // navigate('/')
                // }, 2000)
            }
        } catch (error:any) {
            setTypeMessage('error')
            setOpenMessage(true)
            setMessage(error.message)
        }
    }

    const handleCloseAlert = () => {
        setOpenMessage(false);
    };
    return (
        <SettingLayout>
            <Grid item container lg={12} justifyContent={'center'} mt={2}>
                <Grid item container lg={10} boxShadow={5} justifyContent={'space-between'} borderRadius={2}
                      bgcolor={'white.main'}>
                    <Grid item container lg={12} maxHeight={'50vh'} minHeight={'50vh'} justifyContent={'center'} overflow={'auto'} >
                        {ostan.map((item:any)=>(
                            <>
                                <Grid item container lg={10} xs={10}  bgcolor={'white.main'}
                                      boxShadow={'1px 1px 10px 1px #C4C4C4'} my={1} borderRadius={1}
                                      justifyContent={{
                                          lg: 'space-between',
                                          md: 'space-between',
                                          xs: 'space-between',
                                          xxl:'space-'
                                      }} alignItems={'end'}>
                                    <Grid item container lg={4} xs={12} justifyContent={'center'} mt={{lg: 2, xs: 2}} alignItems={"center"}>
                                        <Typography variant="h1" color={colors.yellow.main}>{item.title.slice(0,25)}</Typography>
                                    </Grid>

                                    <Grid item container lg={4} xs={12} justifyContent={'center'} alignItems={"end"} mt={{xs: 2}}>
                                        <Grid item container lg={4} >
                                            <Typography sx={{cursor: "pointer"}} onClick={() => handleAddFruit(item.id)} variant="h1" color={colors.red.main}>ویرایش <span style={{color: colors.black.main}}></span></Typography>
                                        </Grid>
                                        <Grid item container lg={4}>
                                            <Typography sx={{cursor: "pointer"}} onClick={() => handelDeleted(item.id)} variant="h1" color={colors.red.main}>حذف<span style={{color: colors.black.main}}></span></Typography>
                                        </Grid>
                                        <Grid item container lg={4} alignItems={'center'}>
                                            <Typography sx={{cursor: "pointer"}} onClick={() => handleAddFruit(item.id)}  variant="h1" color={colors.red.main}>جزئیات بیشتر <span style={{color: colors.black.main}}></span></Typography>
                                            {Id === item.id && open ? <KeyboardArrowDownIcon sx={{color: 'kaarnas.yellow'}}/> :
                                                <ChevronLeftIcon sx={{color: 'kaarnas.black'}}/>}
                                        </Grid>

                                    </Grid>

                                    <Grid item container m={0} mb={0} p={0} position={'relative'} lg={12}
                                          md={12} xs={12} sm={12} bgcolor={'white.main'} >
                                        <List sx={{width: '100%'}}>
                                            <CSSTransition key={item.id} in={Id === item.id && open} timeout={300} classNames="fade" unmountOnExit>
                                                <Grid item container justifyContent={'center'} lg={12} mt={2}
                                                      mb={0}>

                                                    <Grid item container lg={12} p={2}>
                                                        <FormControl fullWidth>
                                                            <InputLabel sx={{marginTop:"-15px",
                                                                fontFamily: 'Yekan Bakh Medium',
                                                                fontSize: "1.3rem",
                                                                fontWeight: "bold !important",
                                                                color: colors.black.main + "!important",

                                                            }} shrink htmlFor="bootstrap-input">
                                                                عنوان متن  :
                                                            </InputLabel>
                                                            <MInput
                                                                textarea
                                                                // label="عنوان متن ..."
                                                                minRows={0}
                                                                multiline
                                                                value={title}
                                                                onChange={(e:any)=>SetTitle(e.target.value)}
                                                            />
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item container lg={12} p={2}>
                                                        <FormControl sx={{ width: {lg:'100%', xs: 220, md: 350}}}>
                                                            <InputLabel sx={{marginTop:"-15px",
                                                                fontFamily: 'Yekan Bakh Medium',
                                                                fontSize: "1.3rem",
                                                                fontWeight: "bold !important",
                                                                color: colors.black.main + "!important",

                                                            }} shrink htmlFor="bootstrap-input">
                                                                عکس  :
                                                            </InputLabel>
                                                            <Stack  direction="row" alignItems="center" spacing={2}>
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

                                                            {/*<MInput*/}
                                                            {/*    popup*/}
                                                            {/*    type="file"*/}
                                                            {/*    InputProps={{*/}
                                                            {/*        // startAdornment: <InputAdornment position="start" sx={{fontSize:'5px'}}>ان</InputAdornment>,*/}
                                                            {/*    }} x*/}
                                                            {/*    id="lname"*/}
                                                            {/*    name="lname"*/}
                                                            {/*    label={""}*/}
                                                            {/*    placeholder="نام و نام خانوادگی یا نرم مرکز تخضض خود را وارد کنید"*/}
                                                            {/*    // value={formik.values.lname}*/}
                                                            {/*    // minRows={5}*/}
                                                            {/*    rows={8}*/}
                                                            {/*    onChange={formik.handleChange}*/}
                                                            {/*    onBlur={formik.handleBlur}*/}
                                                            {/*    // error={formik.touched.lname && Boolean(formik.errors.lname)}*/}
                                                            {/*    // helperText={formik.touched.lname && formik.errors.lname}*/}
                                                            {/*/>*/}
                                                        </FormControl>

                                                    </Grid>
                                                    <Grid item container lg={12} p={2}>
                                                        <FormControl fullWidth>
                                                            <InputLabel sx={{marginTop:"-15px",
                                                                fontFamily: 'Yekan Bakh Medium',
                                                                fontSize: "1.3rem",
                                                                fontWeight: "bold !important",
                                                                color: colors.black.main + "!important",

                                                            }} shrink htmlFor="bootstrap-input">
                                                                متن شما  :
                                                            </InputLabel>
                                                            <MInput
                                                                textarea
                                                                // label="متن خود را بنویسید ..."
                                                                minRows={5}
                                                                multiline
                                                                value={Texts}
                                                                onChange={(e:any)=>setTexts(e.target.value)}
                                                            />
                                                        </FormControl>
                                                    </Grid>

                                                    <Grid item container p={2} lg={4} xs={6}
                                                          justifyContent={'center'} alignItems={"center"}
                                                          flexDirection={"column"}>
                                                        {/*<Typography variant="h1" color={colors.kaarnas.yellow}>شکایت شونده : <span style={{color: colors.black.main ,  fontFamily: 'Kalameh Bold', fontWeight: 900, lineHeight: 1.2}}>شکایت</span></Typography>*/}
                                                        <Mbutton onClick={handleOpen} submite
                                                                 sx={{color: '#'}}>
                                                            ثبت
                                                        </Mbutton>
                                                    </Grid>
                                                </Grid>
                                            </CSSTransition>
                                        </List>
                                    </Grid>
                                </Grid>

                            </>

                        ))}
                    </Grid>


                    <Grid item container lg={12}  mt={10} overflow={'auto'} >
                        <Grid item container lg={3}  alignItems={'center'} >
                            <Typography variant={'h1'} p={0.5}>افزدون اخبار جدید</Typography>
                        </Grid>

                        <Grid item container lg={12} p={2}>
                            <FormControl fullWidth>
                                <MInput
                                    textarea
                                    label="عنوان متن ..."
                                    minRows={0}
                                    multiline
                                    value={title}
                                    onChange={(e:any)=>SetTitle(e.target.value)}

                                />
                            </FormControl>
                        </Grid>
                        <Grid item container lg={12} p={2}>
                            <FormControl sx={{ width: {lg:'100%', xs: 220, md: 350}}}>
                                <Stack  direction="row" alignItems="center" spacing={2}>
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

                                {/*<MInput*/}
                                {/*    popup*/}
                                {/*    type="file"*/}
                                {/*    InputProps={{*/}
                                {/*        // startAdornment: <InputAdornment position="start" sx={{fontSize:'5px'}}>ان</InputAdornment>,*/}
                                {/*    }} x*/}
                                {/*    id="lname"*/}
                                {/*    name="lname"*/}
                                {/*    label={""}*/}
                                {/*    placeholder="نام و نام خانوادگی یا نرم مرکز تخضض خود را وارد کنید"*/}
                                {/*    // value={formik.values.lname}*/}
                                {/*    // minRows={5}*/}
                                {/*    rows={8}*/}
                                {/*    onChange={formik.handleChange}*/}
                                {/*    onBlur={formik.handleBlur}*/}
                                {/*    // error={formik.touched.lname && Boolean(formik.errors.lname)}*/}
                                {/*    // helperText={formik.touched.lname && formik.errors.lname}*/}
                                {/*/>*/}
                            </FormControl>

                        </Grid>
                        <Grid item container lg={12} p={2}>
                            <FormControl fullWidth>
                                <MInput
                                    textarea
                                    label="متن خود را بنویسید ..."
                                    minRows={5}
                                    multiline
                                    value={Texts}
                                    onChange={(e:any)=>setTexts(e.target.value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item container lg={12} justifyContent={'end'} p={2}>
                            <MTButton onClick={login} submite>ثبت</MTButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Snackbar open={openMessage} autoHideDuration={4500}
                          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity={typeMessage as AlertColor} sx={{width: '100%'}}>
                        {message}
                    </Alert>
                </Snackbar>
            </Grid>
        </SettingLayout>
    )
}
export default PageSetting
