import React, { useEffect, useRef } from "react";
import {Grid, Box, Typography, Divider} from "@mui/material";
import Imagessds from '@/Assets/images/Group 1 (1).png'
import colors from "@/Assets/theme/base/colors";
import MTButton from "@/Components/Mbutton";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Skeleton from '@mui/material/Skeleton';
import { column } from "stylis";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MBox from "@/Components/MBox";
import Image from "next/image";
import im from '@/Assets/images/logo.png'
import Group from '@/Assets/images/Group 1 (1).png'
import flesh from '@/Assets/images/flesh.png'
import MyImage from "@/Assets/images/Group 3.png";
import url from '@/Api/index'
import Link from "next/link";
function NewProduct() {
    const [value, setValue] = React.useState<number | null>(2);
    const [ostan, setOstan] = React.useState<any[]>([]);
    const boxRef = useRef<HTMLDivElement>(null)
    const elRef = useRef<HTMLDivElement>(null)
    const [soran, setSoran] = React.useState<any>(0)

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`${url}`)
            const data = await response.json();
            setOstan(data);
        }
        getData()
    }, []);

    useEffect(() => {
        function myChange() {
            const soranValue = ((boxRef.current?.offsetWidth ?? 0) - (elRef.current?.offsetWidth ?? 0)) / 2;
            setSoran(soranValue);
        }
        window.addEventListener("resize", myChange);
    }, [
        boxRef,
        elRef,
    ]);


    return (
        <Grid container zIndex={10} item xs={12}   md={12} marginTop={5} justifyContent={"center"}>
            <Grid item container xs={12} md={12} justifyContent={"center"} textAlign={{ xs: "center", md: "center" }} alignItems={"center"}  >
                <Grid item container lg={10} xs={12} justifyContent={"space-between"} >
                    <Grid item container lg={4} xs={4} alignItems={'center'} >
                        <Typography variant="h4" color={colors.black.main}>محصولات <span style={{ color: '#970C0C' }}>جدید</span></Typography>
                    </Grid>

                    <Grid item container lg={2} xs={4} justifyContent={"end"} alignItems={'center'}>
                        <Link href={'NewProduct'}>
                            <Typography variant="subtitle2" color={colors.black.main} >مشاهده همه</Typography>
                        </Link>
                        <ArrowBackIosIcon fontSize="small" sx={{ color: colors.black.main }} />
                    </Grid>
                </Grid>
            </Grid>


            <Grid item container xs={12} md={12} textAlign={{ xs: "center", md: "center" }} alignItems={"center"}
                  justifyContent={"center"}>
                <Grid container rowGap={0} marginTop={{ xs: 10, md: 0 }} justifyContent={"space-evenly"} columns={{ xs: 2, sm: 8, md: 12, lg: 12 }}
                      sx={{ overflow: 'hidden', p: { lg: `${soran}px` } }}>
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
                                              // boxShadow:10,
                                              //  boxShadow: "-8px -8px 2px 2px rgba(9, 54, 141, 1)",
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
                                            image={MyImage.src}
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

        </Grid >
    )
}

export default NewProduct

