import React, { useEffect, useRef } from "react";
import {Grid, Box, Typography, Divider} from "@mui/material";
import colors from "@/Assets/theme/base/colors";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MBox from "@/Components/MBox";
import Link from "next/link";
import Image from "next/image";
import Group from '@/Assets/images/Group 1 (1).png'
import flesh from '@/Assets/images/flesh.png'
import MyAx from '@/Assets/images/realistic-tv-screen-modern-television-lcd-panel-with-soccer-match_97886-738 1.png'
function ProductDiscounts() {
    const [ostan, setOstan] = React.useState<any[]>([]);
    const boxRef = useRef<HTMLDivElement>(null);
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products')
                const data = await response.json();
                setOstan(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getData();
    }, []);




    return (
        <Grid container zIndex={10} item xs={12}   md={12} marginTop={5} justifyContent={"center"}>
            <Grid item container xs={12} md={12} justifyContent={"center"} textAlign={{ xs: "center", md: "center" }} alignItems={"center"}  >
                <Grid item container lg={10} xs={12} justifyContent={"space-between"} >
                    <Grid item container lg={4} xs={4} alignItems={'center'} >
                        <Typography variant="h4" color={colors.black.main}>محصولات تخفیف دار</Typography>
                    </Grid>

                    <Grid item container lg={2} xs={4} justifyContent={"end"} alignItems={'center'}>
                        <Link href={'/ProductDiscount'}>
                            <Typography variant="subtitle2" color={colors.black.main} >مشاهده همه</Typography>
                        </Link>
                        <ArrowBackIosIcon fontSize="small" sx={{ color: colors.black.main }} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container lg={10} xs={12} mt={{lg:4 , xs:4}}>
                <Grid item container lg={12} mb={10} boxShadow={5} borderRadius={2} bgcolor={'farhangian.blue'}>
                    <Grid item container lg={6} xs={12} alignItems={'center'} >
                        <Grid item container lg={8} ml={{lg:2}}>
                            <Typography variant={'body1'} >
                                سری جدید لباس شویی
                                کارایی بهتر ، شستشو در زمان کمتر ، صرفه جویی در مصرف آب و برق
                                دارای برچسب انرژی +++A
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid lg={2} justifyContent={'center'} alignItems={'center'} sx={{display:{xs:'none' , lg:'flex'}}}>
                        <Image src={flesh} width={500} alt={'asd'}/>
                    </Grid>
                    <Grid item container lg={4} xs={12} justifyContent={'end'} >
                        <Image src={Group}  width={200}  alt={'logo'}/>
                    </Grid>
                </Grid>
            </Grid>


            <Grid item container xs={12} md={12} textAlign={{ xs: "center", md: "center" }} alignItems={"center"}
                  justifyContent={"center"}>
                <Grid container rowGap={0} marginTop={{ xs: 10, md: 0 }} justifyContent={"space-evenly"} columns={{ xs: 2, sm: 8, md: 12, lg: 12 }}
                      sx={{ overflow: 'hidden', }}>
                    {ostan.map((item, index) => (
                        <>
                            {(index <= 2) && (
                                <Box className={'box'} key={index}  ref={boxRef} my={4}>
                                    <Card className={'shadow'} ref={elRef}
                                          sx={{
                                        width: '300px',
                                        height: "360px",
                                        borderRadius: '1rem',
                                        outline: "none",
                                        border: 'none',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: "end",
                                        transition: 'box-shadow 0.3s',
                                        '&:hover': {
                                            cursor:"pointer",
                                            boxShadow: 2,
                                        },

                                    }}>
                                        <CardMedia
                                            sx={{
                                                position: 'absolute',
                                                top: "0",
                                                right: "0",
                                                height: "70%",
                                                width: "100%",
                                            }}
                                            component="img"
                                            image={item.image}
                                            alt="green iguana"
                                        />
                                        <CardContent sx={{ position: 'relative' }}>
                                            <Typography gutterBottom variant="h1" component="h2">
                                                {/* {item.title.substring(0, 15)} */}
                                                2.900.000 ریال
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                component="p"
                                            >
                                                یخچال ساید بای ساید
                                            </Typography>

                                        </CardContent>
                                    </Card>
                                </Box>
                            )}
                        </>
                    ))}
                </Grid>
            </Grid>


            <Grid item container lg={11} xs={12} mt={{lg:4 , xs:4}} >
                <Grid item container lg={12} mb={10} borderRadius={2} justifyContent={'space-evenly'} >
                    <Grid item container lg={5} boxShadow={5} xs={12} bgcolor={'#FFB800'} borderRadius={3} alignItems={'center'} >
                        <Grid item container lg={6} justifyContent={'center'}>
                            <Image src={MyAx}  width={200}  alt={'logo'}/>
                        </Grid>
                        <Grid item container lg={6} justifyContent={'center'}>
                            <Typography variant={'body2'} color={'black.main'}>
                                تلویزیون ال ای دی 47 اینچ
                            </Typography>
                            <Typography variant={'body1'} color={'black.main'} textAlign={'center'} >
                                تلویزیون با کیفیت 4K
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item container lg={5} xs={12} boxShadow={5} borderRadius={3}  justifyContent={'center'} >
                    <MBox blurBackground backUrl={require("@/Assets/images/grocery-shop-with-food-shelves-budapest_117930-1488 2.png").default.src}>
                        <Image src={Group}  width={200}  alt={'logo'} />
                    </MBox>
                    </Grid>
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

