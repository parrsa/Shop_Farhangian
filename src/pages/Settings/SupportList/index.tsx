import React, {useEffect, useMemo, useState} from "react";
import {
    Grid,
    Typography,
    Button,
    ListItem,
    IconButton,
    ListItemText,
    Collapse,
    List,
    Modal,
    Box,
    Divider
} from "@mui/material";
import colors from "@/Assets/theme/base/colors";
import nodata from '../../../Assets/images/nodata.svg'
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import DeleteIcon from '@mui/icons-material/Delete';
import Cookies from "js-cookie";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FormControl from "@mui/material/FormControl";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {useTheme} from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import MInput from "@/Components/Minput";
import MTButton from "@/Components/Mbutton";
import SettingLayout from "@/Components/SettingLayout";
import Image from "next/image";

function renderItem({
                        item,
                        // handleRemoveFruit
                    }: any) {
    return (
        // <ListItem
        //     secondaryAction={
        //         <IconButton
        //             edge="end"
        //             aria-label="delete"
        //             title="Delete"
        //             onClick={() => handleRemoveFruit(item)}
        //         >
        //             <DeleteIcon />
        //         </IconButton>
        //     }
        // >
        //     <ListItemText primary={item.description} />
        //     <Typography color={'black.main'} >{item.shekayat_konandeh.first_name}</Typography>
        // </ListItem>
        <Grid item container lg={12} mt={2} mb={0} bgcolor={'blue.main'}>
            <Grid item container lg={4} xs={6} justifyContent={'center'} alignItems={"center"} flexDirection={"column"}>
                <Typography variant="h1" color={colors.yellow.main}>شکایت شونده : <span
                    style={{color: colors.black.main}}>شکایت</span></Typography>
            </Grid>
            <Grid item container lg={4} xs={6} justifyContent={'center'} alignItems={"center"} flexDirection={"column"}>
                <Typography variant="h1" color={colors.yellow.main}>شکایت شونده : <span
                    style={{color: colors.black.main}}>شکایت</span></Typography>
            </Grid>
            <Grid item container lg={4} xs={6} justifyContent={'center'} alignItems={"center"} flexDirection={"column"}>
                <Typography variant="h1" color={colors.yellow.main}>شکایت شونده : <span
                    style={{color: colors.black.main}}>شکایت</span></Typography>
            </Grid>
            {/*<IconButton*/}
            {/*    edge="end"*/}
            {/*    aria-label="delete"*/}
            {/*    title="Delete"*/}
            {/*    onClick={() => handleRemoveFruit(item)}*/}
            {/*>*/}
            {/*    <DeleteIcon />*/}
            {/*</IconButton>*/}
        </Grid>

    );
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: '1rem',
    boxShadow: 24,
    p: 4,
};


function HistoryShekayet() {
    const Cook = Cookies.get('TokenLogin')
    const [ostan, setOstan] = React.useState<any[]>([]);

    const fetchBusinesses = React.useCallback(() => {
            const GetData=async ()=>{
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Token ${Cook}`,
                    }
                };
                const response = await fetch(`https://farhangian.birkar.ir/api/Support/GetAll`, config)
                const data = await response.json();
                if (!Cook) {
                } else {
                    setOstan(data.data)
                }
            }
            GetData()
    }, [Cook])
    useEffect(() => {
        fetchBusinesses()
    }, [fetchBusinesses])

    const theme = useTheme();
    const [fruitsInBasket, setFruitsInBasket] = React.useState<any[]>([]);
    const [open, setopen] = React.useState(false)
    const [Id, setID] = React.useState();
    const items = ostan.map((item) => item.id);
    const [IdDeltedShekayet, setDeltedShekayet] = React.useState()
    const shouldShowTransition = items.includes(Id) && open;
    const handleAddFruit = (item: any) => {
        setID(item);
        setopen(!open);
    };

    // const handleRemoveFruit = (item: any) => {
    //     console.log(item)
    //     setFruitsInBasket((prev) => prev.filter((i) => i !== item));
    //     setopen(false)
    // };
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpen = (item: any) => {
        setOpenModal(true)
        setDeltedShekayet(item)
    };
    const handleClose = () => setOpenModal(false);

    const [openMessage, setOpenMessage] = React.useState(false);
    const [typeMessage, setTypeMessage] = React.useState('')
    const [message, setMessage] = React.useState('')
    const DeleteShekayet = () => {
        const Deleted = async () => {
            try {
                const response = await axios.delete(`https://farhangian.birkar.ir/api/Support/Delete?id=${IdDeltedShekayet}`,
                )
                if (response.status === 200) {
                    setMessage('حذف شکایت مورد نظر با موفقیت انجام شد')
                    setTypeMessage('warning')
                    setOpenMessage(true)
                    setOpenModal(false)
                }
            } catch (error: any) {
                setTypeMessage('error')
                setOpenMessage(true)
                setMessage(error.message)
            }
        }
        Deleted()
    }
    const handleCloseAlert = (event: any, reason: any) => {
        setOpenMessage(false);
    };
    return (
        <SettingLayout>
        <Grid container zIndex={10} item xs={12} md={12} alignItems={'center'} justifyContent={"center"}>
            {ostan?.length == 0 && (
                <>
                    <Grid item container lg={12} md={12} sm={12} minHeight={'90vh'} flexDirection={'column'}
                          justifyContent={'center'} alignItems={'center'}>
                        <Image alt={'icon'} src={nodata} />
                        <Typography variant={'h4'} color={'black.main'}>شکایتی ثبت نشده است !</Typography>
                    </Grid>

                </>
            )}

            {ostan?.length >= 1 && (
                <>
                    <Grid container zIndex={10} item xs={12} md={12} marginTop={5} justifyContent={"center"}>
                        <Grid item container xs={12} md={12} justifyContent={"center"}
                              textAlign={{xs: "center", md: "center"}} alignItems={"center"}>
                            <Grid item container lg={10} justifyContent={"space-between"} alignItems={"center"}>
                                <Grid item container lg={4} xs={12} alignItems={{lg: 'start', xs: 'center'}}
                                      flexDirection={"column"}>
                                    <Typography variant="h4" color={colors.black.main}>لیست پشتیبانی ها</Typography>
                                    {/*<Typography variant="subtitle2" mt={{ lg: 2 }}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ </Typography>*/}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} md={12} textAlign={{xs: "center", md: "center"}}
                              alignItems={"center"}
                              justifyContent={"center"}>
                            <Grid container rowGap={0} justifyContent={"space-evenly"}
                                  columns={{xs: 2, sm: 8, md: 12, lg: 12}}
                            >
                                {ostan?.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <Grid item container lg={10} xs={10} bgcolor={'white.main'} boxShadow={'1px 1px 10px 1px #C4C4C4'} my={2} borderRadius={1} justifyContent={{
                                            lg: 'space-evenly',
                                            md: 'space-evenly', xs: 'space-between'
                                        }} alignItems={'end'}
                                        >
                                            <Grid item container lg={4} xs={12} justifyContent={'center'} mt={{lg: 2, xs: 2}} alignItems={"center"}>
                                                <Typography variant="h1" color={colors.yellow.main}>
                                                    شکایت کننده :{' '}
                                                    <span
                                                        style={{color: colors.black.main, }}>
                                                        {item.firstName} {item.lastName}
                    </span>
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                container
                                                lg={4}
                                                xs={12}
                                                justifyContent={'center'}
                                                mt={{lg: 2, xs: 2}}
                                                alignItems={"end"}
                                            >
                                                <Typography variant="h1" color={colors.yellow.main}>
                                                    موضوع :{' '}
                                                    <span style={{
                                                        color: colors.black.main,
                                                        fontWeight: 900,
                                                        lineHeight: 1.2
                                                    }}>
                                                        {item.title}
                    </span>
                                                </Typography>
                                            </Grid>
                                            <Grid
                                                item
                                                container
                                                lg={4}
                                                xs={12}
                                                justifyContent={'center'}
                                                alignItems={"end"}
                                                mt={{xs: 2}}
                                            >
                                                <Typography sx={{cursor: "pointer"}}
                                                            onClick={() => handleAddFruit(item.id)} variant="h1"
                                                            color={colors.red.main}>
                                                    جزئیات بیشتر{' '}
                                                    <span style={{color: colors.black.main}}>
                        {Id === item.id && open ? <KeyboardArrowDownIcon sx={{color: 'kaarnas.yellow'}}/> :
                            <ChevronLeftIcon sx={{color: 'kaarnas.black'}}/>}
                    </span>
                                                </Typography>
                                            </Grid>

                                            <Grid
                                                item
                                                container
                                                m={0}
                                                mb={0}
                                                p={0}
                                                position={'relative'}
                                                lg={12}
                                                md={12}
                                                xs={12}
                                                sm={12}
                                            >
                                                <List sx={{width: '100%'}}>
                                                    <CSSTransition key={item.id} in={Id === item.id && open}
                                                                   timeout={300} classNames="fade" unmountOnExit>
                                                        <Grid item container justifyContent={'center'} lg={12} mt={2}
                                                              mb={0}>
                                                            <Grid item container lg={10} xs={12} p={2}
                                                                  justifyContent={'start'} alignItems={"start"}
                                                                  flexDirection={"column"}>
                                                                <Typography variant="h1" color={colors.red.main}>متن
                                                                    درخواست :</Typography>
                                                            </Grid>
                                                            <Grid lg={10} item container justifyContent={'start'}
                                                                  mt={{lg: -2, xs: -2}} p={2}>
                                                                <FormControl sx={{width: '95%'}}>
                                                                    <MInput
                                                                        textarea
                                                                        id="description"
                                                                        name="description"
                                                                        label={item.description}
                                                                        type="textarea"
                                                                        disabled={'true'}
                                                                        minRows={5}
                                                                        maxRows={3}
                                                                        multiline
                                                                    />
                                                                </FormControl>
                                                            </Grid>
                                                            <Grid item container p={2} lg={4} xs={6}
                                                                  justifyContent={'center'} alignItems={"center"}
                                                                  flexDirection={"column"}>
                                                                <Typography variant="h1" color={colors.yellow.main}>نتیحه
                                                                    بررسی :{' '}
                                                                    <span style={{
                                                                        color: colors.black.main,
                                                                        fontWeight: 900,
                                                                        lineHeight: 1.2
                                                                    }}>
                                        منتظر بررسی !
                                    </span>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item container p={2} lg={4} xs={6}
                                                                  justifyContent={'center'} alignItems={"center"}
                                                                  flexDirection={"column"}>
                                                                <MTButton onClick={() => handleOpen(item.id)} submite
                                                                         sx={{color: 'white.main'}}>حذف شکایت</MTButton>
                                                            </Grid>
                                                        </Grid>
                                                    </CSSTransition>
                                                </List>
                                            </Grid>
                                        </Grid>
                                    </React.Fragment>
                                ))}

                            </Grid>
                        </Grid>
                    </Grid>

                </>
            )}
            <Dialog
                open={openModal}
                dir={'rtl'}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogContent>
                    <Typography p={2} variant={'h1'} color={'black.main'}>
                        آیا مطمئن هستید که شکایت شما حذف بشه؟
                    </Typography>
                </DialogContent>
                <DialogActions sx={{display: 'flex', justifyContent: 'center',}}>
                    <MTButton submite sx={{width: '4.5rem', height: '2.5rem'}} onClick={handleClose}>
                        خیر
                    </MTButton>

                    <MTButton submite sx={{width: '4.5rem', height: '2.5rem'}} onClick={DeleteShekayet}>
                        بله
                    </MTButton>
                </DialogActions>
            </Dialog>
            <Snackbar open={openMessage} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert sx={{width: '100%'}}>
                    <Typography variant={'caption'}>{message}</Typography>
                </Alert>
            </Snackbar>
        </Grid>
        </SettingLayout>
    )
}

export default HistoryShekayet
