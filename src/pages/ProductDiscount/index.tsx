import React, { useEffect, useRef, useState } from "react";
import { Grid, Box, Typography, Divider, Button, Pagination } from "@mui/material";
import colors from "@/Assets/theme/base/colors";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import MTButton from "@/Components/Mbutton";
import DashboardLayout from "@/Components/Dashboard/Layout";
import { useRouter } from "next/router";
import Image from "next/image";
import Edite from "@/Assets/images/nimbus_edit.svg";
import Trash from "@/Assets/images/circum_trash.svg";
import url from '@/Api';

function Clubs() {
    const [ostan, setOstan] = React.useState<any[]>([]);
    const boxRef = useRef<HTMLDivElement>(null)
    const elRef = useRef<HTMLDivElement>(null)
    const router = useRouter();
    const { title } = router.query;
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`${url}/api/Product/GetProductByTakhfif`)
            const data = await response.json();
            setOstan(data.data);
            setTotalItems(data.totalItems);

        }
        getData()
    }, []);


    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;

    const goToPreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(ostan.length / itemsPerPage)));
    };

    const handlePageChange = (event: any, value: any) => {
        setCurrentPage(value);
    };
    return (
        <DashboardLayout>
            <Grid container zIndex={10} item xs={12} md={12} marginTop={5} justifyContent={"center"}>
                <Grid item container xs={12} marginRight={{ lg: 7, xs: 0 }} md={10} justifyContent={"center"}
                    textAlign={{ xs: "center", md: "center" }} alignItems={"center"} flexDirection={"column"} >
                    <Typography variant="h4" color={colors.black.main}>محصولات تخفیف دار</Typography>
                    <Typography variant="subtitle2" mt={{ lg: 2 }}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ </Typography>
                </Grid>
                <Grid item container xs={12} md={12} textAlign={{ xs: "center", md: "center" }} alignItems={"center"} justifyContent={"center"}>
                    <Grid container rowGap={0} marginTop={{ xs: 10, md: 0 }} columns={{ xs: 2, sm: 12, md: 12, lg: 12 }} sx={{ overflow: 'hidden', }}>
                        {ostan.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) => (
                            <>
                                {(index <= 11) && (
                                    <Grid key={index} marginTop={{ lg: 2 }} item sx={{
                                        display: "flex", justifyContent: "space-between",
                                        flexDirection: "column", alignItems: "center"
                                    }} xs={2} sm={6} lg={3} md={6}>
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
                                                                                    {item?.gheymatNahai?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    {item?.gheymat?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 

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
                                                                                {item?.gheymat?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
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
                                    </Grid>
                                )}
                            </>
                        ))}
                    </Grid>
                    <Grid container justifyContent="center" alignItems="center" marginTop={2}>

                        <Pagination
                            count={Math.ceil(totalItems / itemsPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            variant="outlined"
                            shape="rounded"
                            style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}
                        />
                        {/*<Pagination count={Math.ceil(ostan.length / itemsPerPage)} shape="rounded" />*/}
                    </Grid>
                </Grid>
            </Grid >
        </DashboardLayout>
    )
}

export default Clubs
