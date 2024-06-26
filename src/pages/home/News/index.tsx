import React, { useEffect, useRef, useState } from "react";
import { Grid, Box, Typography, Divider, Card, CardContent, CardMedia } from "@mui/material";
import colors from "@/Assets/theme/base/colors";
import Link from "next/link";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import url from '@/Api';

function NewProduct() {
    const [news, setNews] = useState([]);
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${url}/api/News/GetAll`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setNews(data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <Grid container item xs={12} md={12} marginTop={5} marginBottom={5} justifyContent="center">
            <Grid item container xs={12} md={12} justifyContent="center" textAlign="center" alignItems="center">
                <Grid item container lg={10} xs={12} justifyContent="space-between">
                    <Grid item container className="line" lg={4} xs={4} alignItems="center">
                        <Typography variant={'h4'} sx={{ display: { xs: 'none', sm: 'none', lg: 'flex' } }} color={colors.black.main}>اخبار</Typography>
                        <Typography variant={'h5'} ml={{ lg: 0, xs: 3, sm: 3 }} sx={{ display: { xs: 'flex', sm: 'flex', lg: 'none' } }} color={colors.black.main}>اخبار</Typography>
                    </Grid>
                    <Grid item container lg={2} xs={4} justifyContent={{ lg: "end", xs: 'center' }}>    
                        <Link href="/News" style={{ display: 'flex', textDecoration: 'none' }}>
                            <Typography variant="subtitle2" color={colors.black.main} >مشاهده همه</Typography>
                            <ArrowBackIosIcon fontSize="small" sx={{ color: colors.black.main }} />
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container xs={12} md={12} textAlign="center" alignItems="center" justifyContent="center">
            <Grid container rowGap={0} marginTop={{ xs: 0, md: 0 }} justifyContent={"space-evenly"} columns={{ xs: 2, sm: 12, md: 12, lg: 12 }}>
                    {news.slice(0, 3).map((item: any, index: number) => (
                        <Box key={index} ref={boxRef} my={4}>
                            <Link href={`/News/${item.id}`}>
                                <Card sx={{ width: '300px', height: "380px", borderRadius: '1rem', outline: "none", border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center", boxShadow: 2, transition: 'box-shadow 0.3s', '&:hover': { cursor: "pointer", boxShadow: 10 } }}>
                                    <CardMedia sx={{ position: 'relative', top: "0", right: "0", minHeight: 300, maxHeight: 300 }} component="img" image={`${url}/${item.image}`} alt="news image" />
                                    <CardContent sx={{ position: 'relative', textAlign: 'center', display: 'flex', flexDirection: "column", alignItems: 'center' }}>
                                        <Typography gutterBottom variant="h1" component="h2">
                                            {item.title}
                                        </Typography>
                                        <Divider sx={{ width: '80%', marginTop: '2' }} />
                                        <Typography variant="h1" mt={2}>
                                            برای دیدن مطالب بیشتر کلیک کنید
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Box>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default NewProduct;
