import React, { useEffect, useRef, useState } from "react";
import { Grid, Box, Typography, Divider, Pagination } from "@mui/material";
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
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://farhangian.birkar.ir/api/News/GetAll')
            const data = await response.json();
            setOstan(data.data);
        }
        getData()
    }, [ostan]);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = ostan?.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


    return (
        <DashboardLayout>
            <Grid container zIndex={10} item xs={12} md={12} marginTop={5} justifyContent={"center"}>
                <Grid item container xs={12} marginRight={{ lg: 7, xs: 0 }} md={10} justifyContent={"center"}
                    textAlign={{ xs: "center", md: "center" }} alignItems={"center"} flexDirection={"column"}>
                    <Typography variant="h4" color={colors.black.main}>لیست اخبار</Typography>
                    <Typography variant="subtitle2" mt={{ lg: 2 }}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ </Typography>
                </Grid>
                <Grid item container xs={12} md={12} textAlign={{ xs: "center", md: "center" }} alignItems={"center"}
                    justifyContent={"center"}>
                    <Grid container rowGap={0} marginTop={{ xs: 10, md: 0 }} columns={{ xs: 2, sm: 8, md: 12, lg: 12 }}
                        sx={{ overflow: 'hidden', }}>
                        {ostan?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, index) => (
                            <>
                                {(index <= 11) && (
                                    <Grid key={index} marginTop={{ lg: 2 }} item sx={{
                                        display: "flex", justifyContent: "center",
                                        flexDirection: "column", alignItems: "center"
                                    }} xs={2} sm={12} lg={3} md={6}>
                                        <Box key={index} ref={boxRef} my={4}>
                                            <Link href={`/News/${item.id}`}>
                                                <Card key={index} ref={elRef}
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
                                                            minHeight: 300,
                                                            maxHeight: 300
                                                        }}
                                                        component="img"

                                                        image={`https://farhangian.birkar.ir/${item.image}`}
                                                        alt="green iguana"
                                                    />
                                                    <CardContent sx={{
                                                        position: 'relative', textAlign: 'center', display: 'flex',
                                                        flexDirection: "column", alignItems: 'center'
                                                    }}>
                                                        <Typography gutterBottom variant="h1" component="h2">{item.title.substring(0, 15)}</Typography>
                                                        <Divider sx={{ width: '80%', marginTop: '2' }} />
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
                </Grid>
                <MyPagination itemsPerPage={itemsPerPage} totalItems={ostan.length} paginate={paginate} />
            </Grid>
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
