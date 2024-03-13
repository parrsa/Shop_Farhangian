import React, {useEffect} from "react";
import {Grid, Typography, Divider, AlertColor} from "@mui/material";
import {useFormik} from 'formik';
import * as yup from 'yup';
import colors from "@/Assets/theme/base/colors";
import {useTheme} from '@mui/material/styles';
import DashboardLayout from "@/Components/Dashboard/Layout";
import Image from "next/image";
import MyImage from "@/Assets/images/megaphone-laptop-screen-orange-background-ai-digital-illustration_803320-1252 1.png";
import {useRouter} from "next/router";


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
    const router=useRouter()
    const [openMessage, setOpenMessage] = React.useState(false);
    const [typeMessage, setTypeMessage] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [value, setValue] = React.useState<number | null>(0);
    const [ostan, setOstan] = React.useState<any[]>([]);

    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`https://farhangian.birkar.ir/api/News/GetById?id=${router.query.Newsid}`)
            const data = await response.json();
            setOstan(data.data);
            console.log(data.data)
        }
        getData()
    }, [ostan]);



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
            <Grid item container justifyContent="center" lg={12}  md={6} sm={6}>
                <Grid item container lg={12} alignItems={"end"} height={{lg: '15vh'}}>
                    <Grid item container lg={12} justifyContent={"center"} alignItems={'center'} height={{lg: '10vh'}}>
                        <Grid item container lg={12}  alignItems={'center '} justifyContent={'space-evenly'} >
                            <Typography variant="h4" color={colors.black.main}>اخبار</Typography>
                            <Divider sx={{width: {lg:'85%' , xs:'100%'} , marginRight:2}} style={{
                                display: 'flex',
                                backgroundColor: 'gray',
                                height: 0.1,
                            }}/>
                        </Grid>
                    </Grid>
                </Grid>


                {/*توضیحات*/}
                    <Grid item container lg={12}  justifyContent={{xs:'center' , lg:'center' , md:'start'}} >
                        <Grid item container lg={11} bgcolor={'farhangian.gray'} borderRadius={3} minHeight={'55vh'} xs={11} justifyContent={{xs:'center'}}>
                            <Grid item container lg={6} flexDirection={"column"} alignItems={'center'} justifyContent={'space-evenly'}>
                                <Typography variant={'h4'} color={'#970C0C'}>
                                    ارائه تسهیلات اقساطی ویژه کارکنان
                                </Typography>

                                <Typography variant={'h4'}>
                                    پرداخت اقساط 24 ماهه
                                </Typography>

                                <Typography variant={'h4'}>
                                    ویژه کارکنان
                                </Typography>
                            </Grid>
                            <Grid item container lg={6} justifyContent={'center'} alignItems={'center'}>
                                <Image src={MyImage} alt="Website logo"  />
                            </Grid>
                        </Grid>

                        <Grid item container lg={11} borderRadius={3} minHeight={'55vh'} xs={11} justifyContent={{xs:'center'}}>
                                <Typography variant={'body1'} color={'black.main'} textAlign={'justify'}>
                                    {((ostan && ostan.length>0) && ostan.description) ?? ''}
                                </Typography>
                        </Grid>
                    </Grid>
                </Grid>


        </Grid>
        </DashboardLayout>
    )
}
export default MasterCraftsmanDetails
