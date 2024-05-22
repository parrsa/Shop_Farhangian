import React, { useEffect, useRef, useState } from "react";
import { Grid, Box, Typography, Pagination, } from "@mui/material";
import colors from "@/Assets/theme/base/colors";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import MTButton from "@/Components/Mbutton";
import DashboardLayout from "@/Components/Dashboard/Layout";
import { useRouter } from "next/router";
import url from '@/Api';

function Clubs() {
    const [ostan, setOstan] = React.useState<any[]>([]);
    const boxRef = useRef<HTMLDivElement>(null)
    const elRef = useRef<HTMLDivElement>(null)
    const router = useRouter();
    const { title } = router.query;
    const { Search } = router.query;
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;
    const [totalItems, setTotalItems] = useState(0);

    const [Category, setCategory] = React.useState<any[]>([]);
    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`${url}/api/SubCategory/GetAll`)
            const data = await response.json();
            setCategory(data.data);
        }
        getData()
    }, []);
    const CheckTitle = Category?.find((item) => item.id == title)


    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`${url}/api/Product/GetBySubCategoryId?id= ${title}`)
            const data = await response.json();
            setOstan(data.data);
            setTotalItems(data.totalItems);

        }
        getData()
    }, [title])

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = ostan?.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const handlePageChange = (event: any, value: any) => {
        setCurrentPage(value);
    };
    return (
        <DashboardLayout>
            <Grid container zIndex={10} item xs={12} md={12} sm={12} marginTop={5} justifyContent={"center"}>
                <Grid item container xs={12} marginRight={{lg:7 , xs:0 , sm:0}} md={12} sm={12} justifyContent={"center"} textAlign={{ xs: "center", md: "center" }} alignItems={"center"} flexDirection={"column"} >
                    <Typography variant="h4" color={colors.black.main}>{CheckTitle?.subCategoryName}</Typography>
                    <Typography variant="subtitle2" mt={{ lg: 2 }}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ </Typography>
                </Grid>
                <Grid item container xs={12} md={12} textAlign={{ xs: "center", md: "center" }} alignItems={"center"}
                    justifyContent={"center"}>
                    <Grid container rowGap={0} marginTop={{ xs: 10, md: 0 }} columns={{ xs: 2, sm: 12, md: 12, lg: 12 }}
                        sx={{ overflow: 'hidden', }}>
                        {ostan?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) => (
                            <>
                                {(index <= 11) && (
                                    <Grid key={index} marginTop={{ lg: 2 }} item sx={{
                                        display: "flex", justifyContent: "space-between",
                                        flexDirection: "column", alignItems: "center"
                                    }} xs={2} sm={6} lg={4} md={6}>
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


                                                </CardContent>
                                            </Card>
                                        </Box>
                                    </Grid>
                                )}
                            </>
                        ))}
                    </Grid>
                </Grid>
                {/*<MyPagination itemsPerPage={itemsPerPage} totalItems={ostan?.length} paginate={paginate} />*/}
                <Pagination
                    count={Math.ceil(totalItems / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                    style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}
                />
            </Grid >
        </DashboardLayout>
    )
}

const MyPagination = ({ itemsPerPage, totalItems, paginate }: { itemsPerPage: number, totalItems: number, paginate: Function }) => {
    const pageCount = Math.ceil(totalItems / itemsPerPage);


    return (
        <>
            <Pagination
                count={pageCount}
                onChange={(event: any, page: any) => paginate(page)}
                variant="outlined"
                shape="rounded"
                color="primary"
                style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}
            />
        </>
    );
};

export default Clubs
