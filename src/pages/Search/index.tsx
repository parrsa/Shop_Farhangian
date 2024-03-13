import DashboardLayout from "@/Components/Dashboard/Layout";
import {Box, Grid, Typography} from "@mui/material";
import colors from "@/Assets/theme/base/colors";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import React from "react";
import {useRouter} from "next/router";
import axios from "axios";

const Search = () => {
    const router = useRouter();
    const {title} = router.query
    const [DataSearch, setDataSearch] = React.useState<any>()
    React.useEffect(() => {
        const GetData = async () => {
            const response = await fetch(`https://farhangian.birkar.ir/api/Product/Search?param=${title}`)
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
                                        <Box className={'box'} key={index} my={4}>
                                            <Card className={'shadow'}
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
                                                    image={`https://farhangian.birkar.ir/${item.image}`}
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
                </Grid>


            </Grid>

        </DashboardLayout>
    )
}
export default Search
