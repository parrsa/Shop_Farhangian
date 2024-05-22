import React, { useEffect } from "react";
import { Grid, Typography, Divider, AlertColor, CardMedia } from "@mui/material";
import { useFormik } from 'formik';
import * as yup from 'yup';
import colors from "@/Assets/theme/base/colors";
import { useTheme } from '@mui/material/styles';
import DashboardLayout from "@/Components/Dashboard/Layout";
import Image from "next/image";
import MyImage from "@/Assets/images/megaphone-laptop-screen-orange-background-ai-digital-illustration_803320-1252 1.png";
import { useRouter } from "next/router";
import url from '@/Api';


const tileData = [
    {
        img: '../../../../../../Assets/images/Rectangle 50.png'
    },
    {
        img: '../../../../../../Assets/images/Rectangle 50.png'
    },
    {
        img: '../../../../../../Assets/images/Rectangle 50.png'
    },
    {
        img: '../../../../../../Assets/images/Rectangle 50.png'
    },
    {
        img: '../../../../../../Assets/images/Rectangle 50.png'
    },
    {
        img: '../../../../../../Assets/images/Rectangle 50.png'
    },
    {
        img: '../../../../../../Assets/images/Rectangle 50.png'
    },
    {
        img: '../../../../../../Assets/images/Rectangle 50.png'
    },
    {
        img: '../../../../../../Assets/images/Rectangle 50.png'
    }
];

const commonStyles1 = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    width: { lg: '11rem', xl: '11rem', md: '11rem', xs: "9rem" },
    height: { lg: '11rem', xl: '11rem', md: '11rem', xs: "9rem" },
    zindex: 1000,
};


const formValidationSchema = yup.object({
    Description: yup.string().required('باید حتما متن خود را بنویسید!'),
});
let alertColor: AlertColor | undefined;

const MasterCraftsmanDetails = () => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const router = useRouter()
    const [openMessage, setOpenMessage] = React.useState(false);
    const [typeMessage, setTypeMessage] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [value, setValue] = React.useState<number | null>(0);
    const handleClose = () => {
        setOpen(false);
    };



    const [ostan, setOstan] = React.useState<any>({});

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`${url}/api/News/GetById?id=${router.query.Newsid}`);
            const data = await response.json();
            setOstan(data.data);
        };
        getData();
    }, [router.query.Newsid]);



    const formik = useFormik({
        initialValues: {
            Description: '',
        },
        validationSchema: formValidationSchema,
        onSubmit: (values) => {
        },
    });
    const handleCloseAlert = () => {
        setOpenMessage(false);
    };
    const [openimages, setOpenimage] = React.useState(false);
    const [image, setImage] = React.useState("false");

    const handleCloseimage = () => {
        setOpenimage(false);
    };

    const handleImage = (value: any) => {
        setImage(value);
        setOpenimage(true);
    };

    return (
        <DashboardLayout>
            <Grid container lg={12} md={12}>
                <Grid item container justifyContent="center" lg={12} md={12} sm={12}>
                    <Grid item container lg={12} alignItems={"end"} >
                        <Grid item container lg={12} alignItems={'center '} p={5} justifyContent={'center'} >
                            <Typography variant="h4" color={colors.black.main}>اخبار : {ostan.title}</Typography>
                            {/* <Divider sx={{ width: { lg: '85%', xs: '100%' }, marginRight: 2 }} style={{
                                    display: 'flex',
                                    backgroundColor: 'gray',
                                    height: 0.1,
                                }} /> */}
                        </Grid>
                    </Grid>


                    {/*توضیحات*/}
                    <Grid item container lg={12} justifyContent={{ xs: 'center', lg: 'center', md: 'start' }}  >
                        <Grid item container lg={11}>
                            {/* <Grid item container lg={6} alignItems={'center'} justifyContent={'space-evenly'}>
                                <Typography variant={'h4'} color={'#970C0C'}>
                                    <Typography>{ostan.title}</Typography>
                                </Typography>
                            </Grid> */}
                            <Grid item container lg={12} sm={12} justifyContent={'center'}  alignItems={'start'}>

                                <CardMedia
                                    sx={{
                                        width: '90%',
                                        position: 'relative',
                                        minHeight: { lg: 420, xs: 200 },
                                        maxHeight: { lg: 420, xs: 200 },
                                    }}
                                    component="img"
                                    image={`${url}/${ostan.image}`}
                                    alt="green iguana"
                                />
                            </Grid>
                        </Grid>

                        <Grid item container lg={11} borderRadius={3} xs={11} justifyContent={{ xs: 'center' }}>
                            <Grid item container lg={12}>
                                <Grid item container lg={12}>
                                    <Typography variant={'body1'} color={'black.main'} textAlign={'justify'}>
                                        <Typography>توضیحات : </Typography>
                                    </Typography>
                                </Grid>
                                <Grid item container lg={12}>
                                    <Typography variant={'body1'} color={'black.main'} textAlign={'justify'}>
                                        <Typography>{ostan.description}</Typography>
                                    </Typography>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>


            </Grid>
        </DashboardLayout>
    )
}
export default MasterCraftsmanDetails
