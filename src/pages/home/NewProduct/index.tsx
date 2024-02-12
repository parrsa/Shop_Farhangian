import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Grid, Box, Typography } from "@mui/material";
import colors from "@/Assets/theme/base/colors";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MyImage from "@/Assets/images/HamedanLogo 1.webp";
import url from '@/Api/index'
import Link from "next/link";

function NewProduct() {
    const [ostan, setOstan] = useState<any[]>([]);
    const boxRef = useRef<HTMLDivElement>(null);
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const getData = async () => {
                const response = await fetch('https://fakestoreapi.com/products')
            const data = await response.json();
            setOstan(data);
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
                                  boxShadow:5,

                                  '&:hover': {
                                      cursor: "pointer",
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
                                    borderRadius:'1rem',
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
            </React.Fragment>
        ));
    }, [ostan]);

    return (
        <Grid container zIndex={10} item xs={12} md={12} marginTop={5} justifyContent={"center"}>
            <Grid item container xs={12} md={12} justifyContent={"center"} textAlign={{ xs: "center", md: "center" }} alignItems={"center"}  >
                <Grid item container lg={10} xs={12} justifyContent={"space-between"} >
                    <Grid item container lg={4} xs={4} alignItems={'center'} >
                        <Typography variant="h4" color={colors.black.main}>محصولات جدید</Typography>
                    </Grid>
                    <Grid item container lg={2} xs={4} justifyContent={"end"} alignItems={'center'}>
                        <Link href={'NewProduct'}>
                            <Typography variant="subtitle2" color={colors.black.main} >مشاهده همه</Typography>
                        </Link>
                        <ArrowBackIosIcon fontSize="small" sx={{ color: colors.black.main }} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container xs={12} md={12} textAlign={{ xs: "center", md: "center" }} alignItems={"center"} justifyContent={"center"}>
                <Grid container rowGap={0} marginTop={{ xs: 10, md: 0 }} justifyContent={"space-evenly"} columns={{ xs: 2, sm: 8, md: 12, lg: 12 }} sx={{ overflow: 'hidden', }}>
                    {renderedCards}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default NewProduct;
