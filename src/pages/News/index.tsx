import React, {useEffect, useRef} from "react";
import {Grid, Box, Typography, Divider} from "@mui/material";
import colors from "@/Assets/theme/base/colors";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import MTButton from "@/Components/Mbutton";
import DashboardLayout from "@/Components/Dashboard/Layout";
import MyImage
    from "@/Assets/images/circum_trash.svg";
import Link from "next/link";

function Clubs() {
    const [ostan, setOstan] = React.useState<any[]>([]);
    const boxRef = useRef<HTMLDivElement>(null)
    const elRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts')
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
                      textAlign={{xs: "center", md: "center"}} alignItems={"center"} flexDirection={"column"}>
                    <Typography variant="h4" color={colors.black.main}>لیست اخبار</Typography>
                    <Typography variant="subtitle2" mt={{lg: 2}}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ </Typography>
                </Grid>
                <Grid item container xs={12} md={12} textAlign={{xs: "center", md: "center"}} alignItems={"center"}
                      justifyContent={"center"}>
                    <Grid container rowGap={0} marginTop={{xs: 10, md: 0}} columns={{xs: 2, sm: 8, md: 12, lg: 12}}
                          sx={{overflow: 'hidden', }}>
                        {ostan.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) => (
                            <>
                                {(index <= 11) && (
                                    <Grid key={index} marginTop={{lg: 2}} item sx={{
                                        display: "flex", justifyContent: "center",
                                        flexDirection: "column", alignItems: "center"
                                    }} xs={2} sm={12} lg={3} md={6}>
                                        <Box key={index} ref={boxRef} my={4}>
                                            <Link href={`/News/${item.id}`}>
                                                <Card ref={elRef}
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
                                                          boxShadow: 2,
                                                          transition: 'box-shadow 0.3s',
                                                          '&:hover': {
                                                              cursor: "pointer",
                                                              boxShadow: 10,
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
                                                    <CardContent sx={{
                                                        position: 'relative', textAlign: 'center', display: 'flex',
                                                        flexDirection: "column", alignItems: 'center'
                                                    }}>
                                                        <Typography gutterBottom variant="h1" component="h2">
                                                            {/* {item.title.substring(0, 15)} */}
                                                            ارائه تسهیلات اقساطی ویژه کارکنان
                                                        </Typography>
                                                        <Divider sx={{width: '80%', marginTop: '2'}}/>
                                                        <Typography
                                                            variant="h1"
                                                            mt={2}
                                                        >
                                                            برای دیدن مطالب بیشتر
                                                            کلیک <span color={'red.main'}>کنید</span>
                                                        </Typography>

                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        </Box>
                                    </Grid>
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
                        <MTButton onClick={goToNextPage}
                                  disabled={currentPage === Math.ceil(ostan.length / itemsPerPage)}>
                            Next Page
                        </MTButton>
                        {/*<Pagination currentPage={10} totalPages={totalPages} onPageChange={handlePageChange} />*/}
                        {/*      <Pagination count={Math.ceil(ostan.length / itemsPerPage)} onChange={handlePageChange} />*/}

                        {/*<Pagination count={Math.ceil(ostan.length / itemsPerPage)} onChange={handlePageChange} shape="rounded" />*/}
                    </Grid>
                </Grid>
            </Grid>
        </DashboardLayout>
    )
}

export default Clubs
