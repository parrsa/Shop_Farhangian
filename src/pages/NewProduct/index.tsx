import React, { useEffect, useRef, useState } from "react";
import {Grid, Box, Typography, Divider, Pagination, Button} from "@mui/material";
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

function Clubs() {
    const [ostan, setOstan] = React.useState<any[]>([]);
    const boxRef = useRef<HTMLDivElement>(null);
    const elRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { title } = router.query;

    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        getData(page);
    }, [page]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPages] = useState(12);
    const getData = async (pageIndex: number) => {
        const response = await fetch(`https://farhangian.birkar.ir/api/Product/GetNewestProduct?pageIndex=${page}`);
        const data = await response.json();
        setOstan(data.data);
        setTotalItems(data.totalItems);
    }

    const indexOfLastItem = currentPage * itemsPerPages;
    const indexOfFirstItem = indexOfLastItem - itemsPerPages;
    const currentItems = ostan?.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };


    return (
        <DashboardLayout>
            <Grid container zIndex={10} item xs={12} md={12} marginTop={5} justifyContent={"center"}>
                <Grid item container xs={12} marginRight={7} md={10} justifyContent={"center"}
                      textAlign={{ xs: "center", md: "center" }} alignItems={"center"} flexDirection={"column"}>
                    <Typography variant="h4" color={colors.black.main}>جدیدترین محصولات</Typography>
                    <Typography variant="subtitle2" mt={{ lg: 2 }}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ </Typography>
                </Grid>
                <Grid item container xs={12} md={12} textAlign={{ xs: "center", md: "center" }} alignItems={"center"}
                      justifyContent={"center"}>
                    <Grid container rowGap={0} marginTop={{ xs: 10, md: 0 }} columns={{ xs: 2, sm: 8, md: 12, lg: 12 }}
                          sx={{ overflow: 'hidden', }}>
                        {currentItems.map((item, index) => (
                            <Grid key={index} marginTop={{lg: 2}} item sx={{
                                display: "flex", justifyContent: "space-between",
                                flexDirection: "column", alignItems: "center"
                            }} xs={2} sm={12} lg={3} md={6}>
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
                                                <Box sx={{width:'40px' , height:'30px' , backgroundColor:'red.main' , display:'flex' , justifyContent:'center' , alignItems:'end' , borderRadius:1 }}>
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
                                        <CardContent sx={{position: 'relative' , width:'100%' }}>

                                            <Grid item container lg={12}  mt={2} flexDirection={'column'} >
                                                <Grid item container lg={12} alignItems={'end'}  justifyContent={'center'} >
                                                    <Typography gutterBottom  variant="h1" component="h2">
                                                        {item?.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item container lg={12} justifyContent={ 'start'} alignItems={'end'}>
                                                    <Grid item container lg={3} >
                                                        <Typography gutterBottom variant="h1" component="h2">
                                                            قیمت :
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item container lg={9} justifyContent={'end'}>
                                                        <Typography gutterBottom variant="h1" component="h2" >
                                                            {item?.gheymatNahai.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ریال
                                                        </Typography>
                                                    </Grid>
                                                </Grid>

                                            </Grid>

                                            {item?.isTakhfif && (
                                                <>
                                                    <Grid item container lg={12} justifyContent={ 'start'} alignItems={'end'}>
                                                        <Grid item container lg={4} justifyContent={'start'}>
                                                            <Typography gutterBottom variant="h1" component="h2"  color={item.tedad <=5 ? "red.main" : 'black.main'} >
                                                                موجودی :  {item?.tedad}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item container lg={8} justifyContent={'end'}>
                                                            <Typography gutterBottom variant="caption" component="h2" color={'grey.500'}  style={{ textDecoration: "line-through" }}>
                                                                {item?.gheymat?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ریال
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>

                                                </>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                    <Box mt={4}>
                            <Pagination
                                count={Math.ceil(totalItems / itemsPerPage)}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                                variant="outlined"
                                shape="rounded"
                                style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}
                            />

                        {/*<MyPagination itemsPerPage={itemsPerPage} totalItems={currentItems?.length} paginate={paginate} />*/}

                    </Box>
                </Grid>
            </Grid>
        </DashboardLayout>
    )
}


const MyPagination = ({ itemsPerPage, totalItems, paginate }: { itemsPerPage: number, totalItems: number, paginate: Function }) => {
    let pageCount = Math.ceil( itemsPerPage /totalItems) ;


    return (
        <>
            <Pagination
                count={pageCount}
                onChange={(event:any, page:any) => paginate(page)}
                variant="outlined"
                shape="rounded"
                color="primary"
                style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}
            />
        </>
    );
};
export default Clubs;
