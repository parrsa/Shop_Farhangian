import DashboardLayout from "@/Components/Dashboard/Layout";
import {Box, Grid, Typography} from "@mui/material";
import colors from "@/Assets/theme/base/colors";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import React from "react";
import {useRouter} from "next/router";
import axios from "axios";
import url from '@/Api';

const Search = () => {
    const router = useRouter();
    const {title} = router.query
    const [DataSearch, setDataSearch] = React.useState<any>()
    React.useEffect(() => {
        const GetData = async () => {
            const response = await fetch(`${url}/api/Product/Search?param=${title}`)
            const data = await response.json()
            setDataSearch(data)
        }
        GetData()
    }, [title, DataSearch]);

    return (
        <DashboardLayout>
            <Grid container zIndex={10} item xs={12} md={12} marginTop={5} justifyContent={"center"}>
                <Grid item container xs={12} marginRight={7} md={10} justifyContent={"center"}
                      textAlign={{xs: "center", md: "center"}} alignItems={"center"} flexDirection={"column"}>
                    <Typography variant="h4" color={colors.black.main}>{title}</Typography>
                    <Typography variant="subtitle2" mt={{lg: 2}}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
                        چاپ </Typography>
                </Grid>


                <Grid item container xs={12} md={12} textAlign={{ xs: "center", md: "center" }} alignItems={"center"}
                      justifyContent={"center"}>
                    <Grid container rowGap={0} marginTop={{ xs: 10, md: 0 }} columns={{ xs: 2, sm: 8, md: 12, lg: 12 }}
                          sx={{ overflow: 'hidden',  }}>
                        {Array.isArray(DataSearch) && DataSearch.map((item:any, index:any) => (
                            <>
                                {(index <= 11) && (
                                    <Grid key={index} marginTop={{ lg: 2 }} item sx={{
                                        display: "flex", justifyContent: "center",
                                        flexDirection: "column", alignItems: "center"
                                    }} xs={2} sm={12} lg={3} md={6} >
                                    <Box className={'box'} key={index}  my={4}>
                                            <Card className={'shadow'} 
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


                                    </Grid >
                                )}
                            </>
                        ))}
                    </Grid>
                </Grid>


            </Grid>

        </DashboardLayout>
    )
}
export default Search
