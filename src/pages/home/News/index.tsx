import React, { useEffect, useRef, useState } from "react";
import { Grid, Box, Typography, Divider, Card, CardContent, CardMedia } from "@mui/material";
import colors from "@/Assets/theme/base/colors";
import Link from "next/link";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function NewProduct() {
    const [news, setNews] = useState([]);
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://farhangian.birkar.ir/api/News/GetAll');
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
                        <Typography variant="h4" color={colors.black.main}>اخبار</Typography>
                    </Grid>
                    <Grid item container lg={2} xs={4} justifyContent="end" alignItems="center">
                        <Link href="/News">
                            <Typography variant="subtitle2" color={colors.black.main}>مشاهده همه</Typography>
                        </Link>
                        <ArrowBackIosIcon fontSize="small" sx={{ color: colors.black.main }} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container xs={12} md={12} textAlign="center" alignItems="center" justifyContent="center">
                <Grid container rowGap={0} marginTop={{ xs: 10, md: 0 }} justifyContent="space-evenly" columns={{ xs: 2, sm: 8, md: 12, lg: 12 }} sx={{ overflow: 'hidden' }}>
                    {news.slice(0, 3).map((item: any, index: number) => (
                        <Box key={index} ref={boxRef} my={4}>
                            <Link href={`/News/${item.id}`}>
                                <Card sx={{ width: '300px', height: "380px", borderRadius: '1rem', outline: "none", border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center", boxShadow: 2, transition: 'box-shadow 0.3s', '&:hover': { cursor: "pointer", boxShadow: 10 } }}>
                                    <CardMedia sx={{ position: 'relative', top: "0", right: "0", minHeight: 300, maxHeight: 300 }} component="img" image={`https://farhangian.birkar.ir/${item.image}`} alt="news image" />
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
