import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import colors from "@/Assets/theme/base/colors";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MyImage from "@/Assets/images/HamedanLogo 1.webp";
import url from '@/Api/index'
import Link from "next/link";
import Image from "next/image";
import Edite from "@/Assets/images/nimbus_edit.svg";
import Trash from "@/Assets/images/circum_trash.svg";

function NewProduct() {
    const [ostan, setOstan] = useState<any[]>([]);
    const boxRef = useRef<HTMLDivElement>(null);
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`https://farhangian.birkar.ir/api/Product/GetNewestProduct?pageIndex=${1}`);
            const data = await response.json();
            setOstan(data.data);
        }
        getData()
    }, []);




    const renderedCards = useMemo(() => {
        return ostan.map((item, index) => (
            <React.Fragment key={index}>
                {(index <= 2) && (

                    <Box className={'box'} key={index} ref={boxRef} my={4}>
                        <Card className={'shadow'} ref={elRef}
                            sx={{
                                width: '280px',
                                height: "360px",
                                borderRadius: '1rem',
                                outline: "none",
                                border: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: "end",
                                transition: 'box-shadow 0.3s',
                                boxShadow: 5,
                                '&:hover': {
                                    cursor: "pointer",
                                    boxShadow: 2,
                                },

                            }}>
                            <Grid item container lg={12}>
                                {item?.darsadeTakhfif && (
                                    <Box sx={{ width: '40px', height: '30px', backgroundColor: 'red.main', display: 'flex', justifyContent: 'center', alignItems: 'end', borderRadius: ' 1rem 0px 1rem 0px', position: 'absolute', zIndex: 1, }}>
                                        <Typography gutterBottom variant="caption" component="h2" color={'white.main'}>
                                            {item?.darsadeTakhfif} %
                                        </Typography>
                                    </Box>
                                )}
                            </Grid>
                            <CardMedia
                                sx={{
                                    position: 'absolute',
                                    top: "0",
                                    right: "0",
                                    minHeight: 200,
                                    maxHeight: 200,
                                    borderRadius: '1rem'
                                }}
                                component="img"
                                image={`https://farhangian.birkar.ir/${item.image}`}
                                alt="green iguana"
                            />
                            <CardContent sx={{ position: 'relative', width: '100%' }}>

                                <Grid item container lg={12} mt={2} flexDirection={'column'} >
                                    <Grid item container lg={12} alignItems={'end'} justifyContent={'center'} >
                                        <Typography gutterBottom variant="h1" component="h2">
                                            {item?.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item container lg={12} justifyContent={'start'} alignItems={'end'}>
                                        <Grid item container lg={3} >
                                            <Typography gutterBottom variant="h1" component="h2">
                                                قیمت :
                                            </Typography>
                                        </Grid>
                                        <Grid item container lg={9} justifyContent={'end'}>
                                            <Typography gutterBottom variant="h1" component="h2" >
                                                {item?.isTakhfif ? (
                                                    <>
                                                        {item?.gheymatNahai?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ریال
                                                    </>
                                                ) : (
                                                    <>
                                                        {item?.gheymat?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ریال

                                                    </>
                                                )}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    {
                                        !item.isTakhfif && (
                                            <Grid item container lg={12} justifyContent={'start'} alignItems={'end'}>
                                                <Grid item container lg={4} justifyContent={'start'}>
                                                    <Typography gutterBottom variant="h1" component="h2" color={item.tedad <= 5 ? "red.main" : 'black.main'} >
                                                        موجودی :
                                                    </Typography>
                                                </Grid>
                                                <Grid item container lg={8} justifyContent={'end'}>
                                                    <Typography gutterBottom variant="h1" component="h2" color={item.tedad <= 5 ? "red.main" : 'black.main'} >
                                                        {item?.tedad}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        )
                                    }

                                </Grid>

                                {item?.isTakhfif && (
                                    <>
                                        <Grid item container lg={12} justifyContent={'start'} alignItems={'end'}>
                                            <Grid item container lg={4} justifyContent={'start'}>
                                                <Typography gutterBottom variant="h1" component="h2" color={item.tedad <= 5 ? "red.main" : 'black.main'} >
                                                    موجودی :  {item?.tedad}
                                                </Typography>
                                            </Grid>
                                            <Grid item container lg={8} justifyContent={'end'}>
                                                <Typography gutterBottom variant="caption" component="h2" color={'grey.500'} style={{ textDecoration: "line-through" }}>
                                                    {item?.gheymat?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ریال
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </Box>
                )}
            </React.Fragment>
        ));
    }, [ostan]);

    return (
        <Grid container zIndex={10} item xs={12} md={12} marginTop={5} justifyContent={"center"}>
            <Grid item container xs={12} md={12} justifyContent={"center"} textAlign={{ xs: "center", md: "center" }} alignItems={"center"}  >
                <Grid item container lg={10} xs={12} justifyContent={"space-between"} >
                    <Grid item container lg={4} xs={4} alignItems={'center'} >
                        <Typography variant={'h4'} sx={{ display: { xs: 'none', sm: 'none', lg: 'flex' } }} color={colors.black.main}>محصولات جدید</Typography>
                        <Typography variant={'h6'} ml={{ lg: 0, xs: 3, sm: 3 }} sx={{ display: { xs: 'flex', sm: 'flex', lg: 'none' } }} color={colors.black.main}>محصولات جدید</Typography>
                    </Grid>
                    <Grid item container lg={2} xs={4} justifyContent={{ lg: "end", xs: 'center' }} alignItems={'center'}>
                        <Link href={'NewProduct'} style={{ display: 'flex', textDecoration: 'none' }}>
                            <Typography variant="subtitle2" color={colors.black.main} >مشاهده همه</Typography>
                            <ArrowBackIosIcon fontSize="small" sx={{ color: colors.black.main }} />
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container xs={12} md={12} textAlign={{ xs: "center", md: "center" }} alignItems={"center"} justifyContent={"center"}>
                <Grid container rowGap={0} marginTop={{ xs: 0, md: 0 }} justifyContent={"space-evenly"} columns={{ xs: 2, sm: 12, md: 12, lg: 12 }}>
                    {renderedCards}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default NewProduct;
