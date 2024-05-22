import React, { useEffect, useRef } from "react";
import { Grid, Box, Typography, Divider } from "@mui/material";
import colors from "@/Assets/theme/base/colors";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Link from "next/link";
import Image from "next/image";
import Group from '@/Assets/images/Group 1 (1).png'
import flesh from '@/Assets/images/flesh.png'
import MyAx from '@/Assets/images/realistic-tv-screen-modern-television-lcd-panel-with-soccer-match_97886-738 1.png'
import { Item } from "devextreme-react/cjs/accordion";
import url from '@/Api';

function ProductDiscounts() {
    const [ostan, setOstan] = React.useState<any[]>([]);
    const boxRef = useRef<HTMLDivElement>(null);
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`${url}/api/Product/GetProductByTakhfif`);
            const data = await response.json();
            setOstan(data.data);
        }
        getData()
    }, []);


    const [banner, setbaneer] = React.useState<any[]>([]);
    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`${url}/api/Banner/GetAll`)
            const data = await response.json();
            setbaneer(data.data);
        }
        getData()
    }, []);



    return (
        <Grid container zIndex={10} item xs={12} md={12} marginTop={5} justifyContent={"center"}>
            <Grid item container xs={12} md={12} justifyContent={"center"} textAlign={{ xs: "center", md: "center" }} alignItems={"center"}  >
                <Grid item container lg={10} xs={12} justifyContent={"space-between"} >
                    <Grid item container lg={4} xs={4} alignItems={'center'} >
                        <Typography variant={'h4'} sx={{ display: { xs: 'none', sm: 'none', lg: 'flex' } }} color={colors.black.main}>محصولات تخفیف دار</Typography>
                        <Typography variant={'h6'} ml={{ lg: 0, xs: 3, sm: 3 }} sx={{ display: { xs: 'flex', sm: 'flex', lg: 'none' } }} color={colors.black.main}>محصولات تخفیف دار</Typography>
                    </Grid>

                    <Grid item container lg={2} xs={4} justifyContent={{ lg: "end", xs: 'center' }} alignItems={'center'}>
                        <Link href={'/ProductDiscount'} style={{ display: 'flex', textDecoration: 'none' }}>
                            <Typography variant="subtitle2" color={colors.black.main} >مشاهده همه</Typography>
                            <ArrowBackIosIcon fontSize="small" sx={{ color: colors.black.main }} />
                        </Link>

                    </Grid>
                </Grid>
            </Grid>
            {/*<Grid item container lg={10} xs={12} mt={{lg:4 , xs:4}}>*/}
            {/*    <Grid item container lg={12} mb={10} boxShadow={5} borderRadius={2} bgcolor={'farhangian.blue'}>*/}
            {/*        <Grid item container lg={6} xs={12} alignItems={'center'} >*/}
            {/*            <Grid item container lg={8} ml={{lg:2}}>*/}
            {/*                <Typography variant={'body1'} >*/}
            {/*                    سری جدید لباس شویی*/}
            {/*                    کارایی بهتر ، شستشو در زمان کمتر ، صرفه جویی در مصرف آب و برق*/}
            {/*                    دارای برچسب انرژی +++A*/}
            {/*                </Typography>*/}
            {/*            </Grid>*/}
            {/*        </Grid>*/}
            {/*        <Grid lg={2} justifyContent={'center'} alignItems={'center'} sx={{display:{xs:'none' , lg:'flex'}}}>*/}
            {/*            <Image src={flesh} width={500} alt={'asd'}/>*/}
            {/*        </Grid>*/}
            {/*        <Grid item container lg={4} xs={12} justifyContent={'end'} >*/}
            {/*            <Image src={Group}  width={200}  alt={'logo'}/>*/}
            {/*        </Grid>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}


            <Grid item container xs={12} md={12} textAlign={{ xs: "center", md: "center" }} alignItems={"center"}
                justifyContent={"center"}>
                <Grid container rowGap={0} marginTop={{ xs: 0, md: 0 }} justifyContent={"space-evenly"} columns={{ xs: 2, sm: 8, md: 12, lg: 12 }}
                >
                    {ostan?.map((item, index) => (
                        <>
                            {(index <= 2) && (

                                <Box className={'box'} key={index} ref={boxRef} my={4}>
                                    <Card className={'shadow'} ref={elRef}
                                        sx={{
                                            width: '290px',
                                            height: (item?.gheymat) ? '360px' : '380px',
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
                                            image={`${url}/${item.image}`}
                                            alt="green iguana"
                                        />
                                        <CardContent sx={{ position: 'relative', width: '100%' }}>
                                            {(item?.gheymat) ? (
                                                <>
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
                                                </>

                                            ) : (<>
                                                <Grid item container lg={12} flexDirection={'column'} >
                                                    <Grid item container lg={12} justifyContent={'start'} alignItems={'end'}>
                                                        {/* <Grid item container lg={3}>
                                                            <Typography gutterBottom variant="h1" component="h2">
                                                                محصول :
                                                            </Typography>
                                                        </Grid> */}
                                                        <Grid item container lg={12} justifyContent={'center'}>
                                                            <Typography gutterBottom variant="h1" component="h2" >
                                                                {item?.name}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item container lg={12} justifyContent={'start'} alignItems={'end'}>
                                                        <Grid item container lg={3}>
                                                            <Typography gutterBottom variant="h1" component="h2">
                                                                موجودی :
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item container lg={9} justifyContent={'start'}>
                                                            <Typography gutterBottom variant="h1" component="h2" >
                                                                {item?.tedad}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    {/* <Grid item container lg={12} justifyContent={'start'} alignItems={'end'}>
                                                        <Grid item container lg={4} justifyContent={'start'}>
                                                            <Typography gutterBottom variant="h1" component="h2" color={item.tedad <= 5 ? "red.main" : 'black.main'} >
                                                                موجودی :
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item container lg={8} justifyContent={'start'}>
                                                            <Typography gutterBottom variant="h1" component="h2" color={item.tedad <= 5 ? "red.main" : 'black.main'} >
                                                                {item?.tedad}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid> */}
                                                    <Grid item container lg={12} justifyContent={'start'} alignItems={'end'}>
                                                        <Grid item container lg={12}>
                                                            <Typography gutterBottom variant="h1" component="h2">
                                                                توضیحات :
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item container lg={12} justifyContent={'start'}>
                                                            <Typography gutterBottom variant="caption" component="h2" >
                                                                {item?.description}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>


                                                </Grid>
                                            </>)}



                                        </CardContent>
                                    </Card>
                                </Box>
                            )}
                        </>
                    ))}
                </Grid>
            </Grid>


            <Grid item container lg={11} xs={12} mt={{ lg: 4, xs: 4 }} >
                <Grid item container lg={12} mb={10} borderRadius={2} justifyContent={'space-evenly'} >


                    {banner?.map((item, index) => (<>
                        <Grid item key={index} container lg={5.5} bgcolor={item?.backColor} minHeight={{ lg: '25vh' }} boxShadow={5} xs={10} sm={5} borderRadius={3} justifyContent={'center'} alignItems={'center'} >
                            <Grid item container lg={5} justifyContent={'center'}>
                                <CardMedia
                                    sx={{
                                        position: 'relative',
                                        top: "0",
                                        right: "-10px",
                                        minHeight: 130,
                                        maxHeight: 130,
                                        borderRadius: '0.2'
                                    }}
                                    component="img"
                                    image={`${url}/${item.image}`}
                                    alt="green iguana"
                                />
                            </Grid>
                            <Grid item container lg={7} justifyContent={'center'} flexDirection={'column'} alignItems={'center'}>
                                <Grid item container lg={11}>
                                    <Typography variant={'body1'} sx={{
                                        textAlign: 'justify',
                                        lineHeight: 1.68,
                                    }} color={item?.color}>
                                        {item.title}
                                    </Typography>
                                </Grid>

                                <Typography variant={'body1'} mt={2} sx={{
                                    lineHeight: 1.68,
                                }} color={item?.color}  >
                                    {item.description}
                                </Typography>
                            </Grid>
                        </Grid>
                    </>
                    ))}

                    {/* Object.entries(obj).map(
      ([k, v], i) => [k, fn(v, k, i)]
                    ) */}
                </Grid>
            </Grid>

        </Grid >
    )
}

function debounce(func: Function, wait: number) {
    let timeout: ReturnType<typeof setTimeout>;
    return function executedFunction(...args: any[]) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export default ProductDiscounts

