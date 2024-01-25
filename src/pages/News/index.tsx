import React, { useEffect, useRef } from "react";
import {Grid, Box, Typography, Divider} from "@mui/material";
import colors from "@/Assets/theme/base/colors";
import Images from './../../../../../Assets/images/Rectangle 2.webp'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import MTButton from "@/Components/Mbutton";
import StarIcon from '@mui/icons-material/Star';
import DashboardLayout from "@/Components/Dashboard/Layout";
import MyImage from "@/Assets/images/megaphone-laptop-screen-orange-background-ai-digital-illustration_803320-1252 1.png";
import Link from "next/link";
function Clubs() {
    const [value, setValue] = React.useState<number | null>(2);
    const [ostan, setOstan] = React.useState<any[]>([]);
    const boxRef = useRef<HTMLDivElement>(null)
    const elRef = useRef<HTMLDivElement>(null)
    const [soran, setSoran] = React.useState<any>(0)

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts')
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
        <DashboardLayout>
        <Grid container zIndex={10} item xs={12} md={12} marginTop={5} justifyContent={"center"}>
            <Grid item container xs={12} marginRight={7} md={10} justifyContent={"center"}
                  textAlign={{ xs: "center", md: "center" }} alignItems={"center"} flexDirection={"column"} >
                <Typography variant="h4" color={colors.black.main}>لیست اخبار</Typography>
                <Typography variant="subtitle2" mt={{ lg: 2 }}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ </Typography>
            </Grid>
            <Grid item container xs={12} md={12} textAlign={{ xs: "center", md: "center" }} alignItems={"center"}
                  justifyContent={"center"}>
                <Grid container rowGap={0} marginTop={{ xs: 10, md: 0 }} columns={{ xs: 2, sm: 8, md: 12, lg: 12 }}
                      sx={{ overflow: 'hidden', p: { lg: `${soran}px` } }}>
                    {ostan.map((item, index) => (
                        <>
                            {(index <= 11) && (
                                <Grid key={index} marginTop={{ lg: 2 }} item sx={{
                                    display: "flex", justifyContent: "center",
                                    flexDirection: "column", alignItems: "center"
                                }} xs={2} sm={12} lg={3} md={6} >
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
                                                   boxShadow:10,
                                                   //  boxShadow: "-8px -8px 2px 2px rgba(9, 54, 141, 1)",
                                                   transition: 'box-shadow 0.3s',
                                                   '&:hover': {
                                                       cursor:"pointer",
                                                       boxShadow: 2,
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
                                                    کلیک  <span color={'red.main'}>کنید</span>
                                                </Typography>

                                            </CardContent>
                                        </Card>
                                        </Link>
                                    </Box>
                                </Grid >
                            )}
                        </>
                    ))}
                </Grid>
            </Grid>
        </Grid >
            </DashboardLayout>
    )
}

export default Clubs
