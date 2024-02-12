import React, { useEffect, useRef } from "react";
import {Grid, Box, Typography, Divider} from "@mui/material";
import colors from "@/Assets/theme/base/colors";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from "next/link";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import url from '@/Api/index'
import MyImage from "@/Assets/images/HamedanLogo 1.webp";
function NewProduct() {
    const [ostan, setOstan] = React.useState<any[]>([]);
    const boxRef = useRef<HTMLDivElement>(null)
    const elRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://fakestoreapi.com/products')
            const data = await response.json();
            setOstan(data);
        }
        getData()
    }, []);



    return (
        <Grid container zIndex={10} item xs={12}   md={12} marginTop={5} justifyContent={"center"}>
            <Grid item container xs={12} md={12} justifyContent={"center"} textAlign={{ xs: "center", md: "center" }} alignItems={"center"}  >
                <Grid item container lg={10} xs={12} justifyContent={"space-between"} >
                    <Grid item container className={'line'} lg={4} xs={4} alignItems={'center'} >
                        <Typography variant="h4" color={colors.black.main}>اخبار</Typography>
                    </Grid>

                    <Grid item container lg={2} xs={4} justifyContent={"end"} alignItems={'center'}>
                        <Link href={'/News'}>
                            <Typography variant="subtitle2" color={colors.black.main} >مشاهده همه</Typography>
                        </Link>

                            <ArrowBackIosIcon fontSize="small" sx={{ color: colors.black.main }} />

                    </Grid>
                </Grid>
            </Grid>


            <Grid item container xs={12} md={12} textAlign={{ xs: "center", md: "center" }} alignItems={"center"}
                  justifyContent={"center"}>
                <Grid container rowGap={0} marginTop={{ xs: 10, md: 0 }} justifyContent={"space-evenly"} columns={{ xs: 2, sm: 8, md: 12, lg: 12 }}
                      sx={{ overflow: 'hidden',  }}>
                    {ostan.map((item, index) => (
                        <>
                            {(index <= 2) && (

                                <Box key={index}  ref={boxRef} my={4}>
                                    <Link href={`/News/${item.id}`}>
                                    <Card  ref={elRef}
                                          sx={{
                                              width: '330px',
                                              height: "auto",
                                              borderRadius: '1rem',
                                              outline: "none",
                                              border: 'none',
                                              display: 'flex',
                                              flexDirection: 'column',
                                              alignItems: 'center',
                                              justifyContent: "center",
                                              boxShadow:2,
                                              transition: 'box-shadow 0.3s',
                                              '&:hover': {
                                                  cursor:"pointer",
                                                  boxShadow: 10 ,
                                              },

                                          }}>
                                        <CardMedia
                                            sx={{
                                                position: 'relative',
                                                top: "0",
                                                right: "0",
                                            }}
                                            component="img"
                                            image={MyImage.src}
                                            alt="green iguana"
                                        />
                                        <CardContent sx={{ position: 'relative' , textAlign:'center' , display:'flex' ,
                                            flexDirection:"column" , alignItems:'center' }}>
                                            <Typography gutterBottom variant="h1" component="h2">
                                                {/* {item.title.substring(0, 15)} */}
                                                ارائه تسهیلات اقساطی ویژه کارکنان
                                            </Typography>
                                            <Divider sx={{width:'80%' , marginTop:'2'}} />
                                            <Typography
                                                variant="h1"
                                                mt={2}
                                            >
                                                برای دیدن مطالب بیشتر
                                                

                                                کلیک
                                                {/*<span color={'red.main'}>کنید</span>*/}

                                            </Typography>

                                        </CardContent>
                                    </Card></Link>
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

