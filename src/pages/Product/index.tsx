import React, { useEffect, useRef } from "react";
import {Grid, Box, Typography, } from "@mui/material";
import colors from "@/Assets/theme/base/colors";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import MTButton from "@/Components/Mbutton";
import DashboardLayout from "@/Components/Dashboard/Layout";
import {useRouter} from "next/router";
function Clubs() {
    const [ostan, setOstan] = React.useState<any[]>([]);
    const boxRef = useRef<HTMLDivElement>(null)
    const elRef = useRef<HTMLDivElement>(null)
    const router = useRouter();
    const { title } = router.query;
    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://fakestoreapi.com/products')
            const data = await response.json();
            setOstan(data);
        }
        getData()
    }, []);


    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10; //

    const goToPreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(ostan.length / itemsPerPage)));
    };

    return (
        <DashboardLayout>
            <Grid container zIndex={10} item xs={12} md={12} marginTop={5} justifyContent={"center"}>
                <Grid item container xs={12} marginRight={7} md={10} justifyContent={"center"}
                      textAlign={{ xs: "center", md: "center" }} alignItems={"center"} flexDirection={"column"} >
                    <Typography variant="h4" color={colors.black.main}>{title}</Typography>
                    <Typography variant="subtitle2" mt={{ lg: 2 }}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ </Typography>
                </Grid>
                <Grid item container xs={12} md={12} textAlign={{ xs: "center", md: "center" }} alignItems={"center"}
                      justifyContent={"center"}>
                    <Grid container rowGap={0} marginTop={{ xs: 10, md: 0 }} columns={{ xs: 2, sm: 8, md: 12, lg: 12 }}
                          sx={{ overflow: 'hidden',  }}>
                        {ostan.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) =>(
                            <>
                                {(index <= 11) && (
                                    <Grid key={index} marginTop={{ lg: 2 }} item sx={{
                                        display: "flex", justifyContent: "center",
                                        flexDirection: "column", alignItems: "center"
                                    }} xs={2} sm={12} lg={3} md={6} >
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
                                                      boxShadow:5,
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
                                                        borderRadius:'1rem'
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

                                    </Grid >
                                )}
                            </>
                        ))}
                    </Grid>
                    <Grid container justifyContent="center" alignItems="center" marginTop={2}>
                        <MTButton onClick={goToPreviousPage} disabled={currentPage === 1}>
                            Previous Page
                        </MTButton>
                        <Typography variant="subtitle2" mx={2}>
                            Page {currentPage} of {Math.ceil(ostan.length / itemsPerPage)}
                        </Typography>
                        <MTButton onClick={goToNextPage} disabled={currentPage === Math.ceil(ostan.length / itemsPerPage)}>
                            Next Page
                        </MTButton>
                  {/*<Pagination currentPage={10} totalPages={totalPages} onPageChange={handlePageChange} />*/}
                  {/*      <Pagination count={Math.ceil(ostan.length / itemsPerPage)} onChange={handlePageChange} />*/}

                        {/*<Pagination count={Math.ceil(ostan.length / itemsPerPage)} onChange={handlePageChange} shape="rounded" />*/}
                    </Grid>
                </Grid>
            </Grid >
        </DashboardLayout>
    )
}

export default Clubs
