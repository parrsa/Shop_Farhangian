// import React, { useEffect, useState } from "react";
// import { Box, Grid, Typography } from "@mui/material";
// import Colors from "@/Assets/theme/base/colors";
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import Minput from "@/Components/Minput";
// import { images } from "./CarouselData";
// import Image from "next/image";
// import MBox from "@/Components/MBox";

// const LandingPage = () => {
//     const [array , setArray]=React.useState(images)
//     const [currImg, setCurrImg] = useState(0)

//     // useEffect(() => {
//     //     const intervalId = setInterval(() => {
//     //         setCurrImg((prev) => (prev + 1) % images.length);
//     //     }, 3500);
//     //     return () => clearInterval(intervalId);
//     // }, [currImg, images.length]);
//     // const handleImageChange = (direction:any) => {
//     //     if (direction === "left" && currImg > 0) {
//     //         setCurrImg(currImg - 1);
//     //     } else if (direction === "right" && currImg < images.length - 1) {
//     //         setCurrImg(currImg + 1);
//     //     }
//     // };

//     const handleImageChange = (cur:number) => {
//        setCurrImg(cur)
//     };

//     return (
//         <Grid container about="landing pages" sx={{ backgroundSize: 'cover' }} height={{ lg: "70vh", xs: '95vh', md: '100vh' }} justifyContent="center" alignItems="start">
//             <Grid item container height={{ lg: "65vh", xs: '95vh', md: '100vh' }}>
//                 <div className="carousel">
//                     <div className="carouselInner">
//                         <MBox backgroundImage backUrl={images[currImg].img.src} sx={{width:'100%' , height:'100%'}}>

//                         </MBox>
//                         {/*</div>
//                         {/*<div className="left" onClick={() => handleImageChange("left")}>*/}
//                         {/*    <ArrowBackIcon sx={{ color: Colors.black.main }} />*/}
//                         {/*</div>*/}
//                         {/*<div className="right" onClick={() => handleImageChange("right")}>*/}
//                         {/*    <ArrowForwardIcon sx={{ color: Colors.black.main }} />*/}
//                         {/*</div>*/}

//                     </div>
//                     <div className="btn">
//                         {images.map((item, i) => (
//                             <button
//                                 onClick={() => handleImageChange(i)}
//                                 style={{ display:"flex" , justifyContent: "center" }}
//                             >
//                                 <span style={{background: i === currImg ? '#09368D' : '#AED8CC' }} className="dot"></span>
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             </Grid>
//         </Grid>
//     );
// };

//export default LandingPage;


// import React, {useEffect} from 'react';
// import Carousel from 'react-material-ui-carousel'
// import { Paper, Button, Grid } from '@mui/material'
// import Image from "next/image";
// import Ubc from "@/Assets/images/Rectangle 34.png";
// import Ubc1 from "@/Assets/images/Artboard 1 (3) 1 (1).png";

// const items = [
//     {
//         name: "Random Name #1",
//         description: "Probably the most random thing you have ever seen!",
//         img: Ubc,
//         color: '#FEC101'
//     },
//     {
//         name: "Random Name #2",
//         description: "Probably the most random thing you have ever seen!",
//         img: Ubc1,
//         color: 'red.main'
//     },
//     {
//         name: "Random Name #2",
//         description: "Probably the most random thing you have ever seen!",
//         img: Ubc1,
//         color: 'white.main'
//     }
// ];

// const Example = (props: any) => {
//     const [Product,setProduct]=React.useState<any []>([])
//     React.useEffect(()=>{
//         const GetData=async ()=>{
//             const response=await fetch('https://farhangian.birkar.ir/api/Advertisement/GetAll')
//             const data=await response.json()
//             setProduct(data.data)
//         }
//         GetData()
//     },[])
//     return (
//         <Carousel>
//             {Product.map((item, i) => <Item key={i} item={item} />)}
//         </Carousel>
//     );
// };

// export default Example;

// const Item = (props: any) => {
//     return (
//         <Paper sx={{ maxHeight: '30vh', minHeight: '60vh', display: 'flex' }}>
//             <Grid item container height={{ lg: "60vh", xs: '28vh',sm:'35vh', md: '100vh' }} >
//                 <img src={`https://farhangian.birkar.ir/${props.item.image}`}  style={{width: "100&", maxWidth: "80%", margin: "auto"}} sizes="100vw"  alt={'images'} />
//             </Grid>
//         </Paper>
//     );
// };


// import { Box, Grid, Typography } from "@mui/material";
// import colors from "../../../../Assets/theme/base/colors";
// import MInput from "../../../../CustomMui/Minput";
// import SearchImages from '../../../../Assets/images/Search.png'
// import MIconButton from "../../../../CustomMui/MiconButton";
// const LandingPage = () => {
//     return (
//         <Grid container about="landing pages" zIndex={-10} className="p" sx={{ backgroundSize: { xs: 'cover', md: "cover", lg: 'cover' } }} height={{ lg: "100vh", xs: '95vh', md: '100vh' }} justifyContent={"center"} alignItems={"center"} md={12}>
//             <Grid item container position={"absolute"} mt={{ lg: 12 }} lg={12} justifyContent={"center"} alignItems={"start"} gap={5} >
//                 <Grid container item lg={8} alignItems={"center"} flexDirection={"column"}>
//                     <Typography variant="h3" fontSize={{ lg: "65px", xs: '35px', md: "50px" }}>هر حرفه ایی که لازم داری </Typography>
//                     <Typography variant="h1" fontSize={{ lg: "150px", xs: '35px', md: "50px" }}>با کارناس پیدا کن</Typography>
//                 </Grid>
//                 <Grid container item lg={12} md={12} mt={{ lg: '10px' }} height={{ lg: "15vh", md: '15vh', xs: "15vh" }} justifyContent={"center"}>
//                     <Grid item container lg={6} md={6} >
//                         <Grid item container justifyContent={"center"} alignItems={"center"} flexDirection={"column"} lg={12} md={12} >
//                             <Box sx={{ width: '80%', height: '55px', borderRadius: '20rem', backgroundColor: '#2A2A2A', border: `1px solid ${colors.kaarnas.yellow}`, display: 'flex' }} justifyContent={""} alignItems={"center"}>
//                                 <MInput sx={{
//                                     width: '91.5%',
//                                     "& .MuiInputBase-root": {
//                                         color: colors.white.main + "!important"
//                                     },
//                                 }} search id="outlined-basic" label="جست و جو . . ." variant="outlined" />
//                                 <MIconButton suze={"small"} SearchBox  >
//                                     <img src={SearchImages} alt="icons" width={"25px"} height={"25px"} />
//                                 </MIconButton>
//                             </Box>
//                             <Typography variant="subtitle2" mt={{ lg: 2 }}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</Typography>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>

//         </Grid>
//     )
// }
// export default LandingPage


// import React, { useEffect } from "react";
// import { useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { Box, Grid, Typography, } from "@mui/material";
// import Colors from '@/Assets/theme/base/colors'
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// import imagessss from '@/Assets/images/khatooni.jpg'
// import MInput from "@/Components/Minput";
// import Image from "next/image";
// import CardMedia from "@mui/material/CardMedia";

// const LandingPage = () => {
//     const [currImg, setCurrImg] = useState(0);
//     const [Product, setProduct] = React.useState<any[]>([])
//     React.useEffect(() => {
//         const GetData = async () => {
//             const response = await fetch('https://farhangian.birkar.ir/api/Advertisement/GetAll')
//             const data = await response.json()
//             setProduct(data.data)
//         }
//         GetData()
//     }, [])

//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             setCurrImg(prev => (prev + 1) % Product.length);
//         }, 3500);
//         return () => clearInterval(intervalId);
//     }, [currImg, Product.length]);

//     const [value, setValue] = React.useState();
//     // const SearchC = zirsenf.filter(product =>
//     //     product.title && product.title.toLowerCase().includes((value ?? '').toLocaleLowerCase().slice(0, 12))
//     // );

//     // const HandelSearch=()=>{
//     //     navigate(`/Search/${value}`)
//     // }


//     return (
//         <>
//             <Grid container about="landing pages" zIndex={-10}
//                 sx={{ backgroundSize: { xs: 'cover', md: "cover", lg: 'cover' } }}
//                 height={{ lg: "70vh", xs: '35vh', sm: '40vh', md: '100vh' }} justifyContent={"center"}
//                 alignItems={"start"} md={12}>
//                 <Grid item container height={{ lg: "65vh", xs: '28vh', sm: '35vh', md: '100vh' }}>
//                     <div className="carousel">
//                         <div
//                             className="carouselInner"
//                         >
//                             <div className="carouselInner1"
//                                 // onClick={() => navigate(`/dashboard/${images[currImg].id}`)}
//                                 style={{
//                                     // backgroundImage: `url(${Test[currImg].img})`,
//                                     cursor: 'pointer',
//                                     backgroundSize: 'cover', // Make sure the image covers the area without being stretched
//                                     backgroundPosition: 'center', // Center the background image
//                                     width: '100%', // Ensure the div takes the full width of its parent
//                                     height: '100%' // Ensure the div takes the full height of its parent
//                                 }}
//                             >
//                                 <img src={`https://farhangian.birkar.ir/${Product[currImg]?.image}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={'images'} />

//                             </div>
//                             {/* </Link> */}
//                             {/* <Link href={`/${images[currImg].id}`}>
//                                 <img src={images[currImg].img} width={"100%"} height={"100%"} alt="icons" />
//                             </Link> */}
//                             {/* <img src={images[currImg].img} /> */}
//                             <div
//                                 className="left"
//                                 onClick={() => {
//                                     currImg > 0 && setCurrImg(currImg - 1);
//                                 }}
//                             >
//                                 <ArrowBackIcon sx={{ color: Colors.black.main }} />
//                             </div>
//                             <div
//                                 className="right"
//                                 onClick={() => {
//                                     currImg < Product.length - 1 && setCurrImg(currImg + 1);
//                                 }}
//                             >
//                                 <ArrowForwardIcon sx={{ color: Colors.black.main }} />
//                             </div>
//                         </div>
//                     </div>
//                 </Grid>
//                 {/* <Grid item position={'relative'} mb="50px" container lg={8} height="10vh" justifyContent={"center"} sx={{display:{xs:'none',md:'flex', lg:'flex'}}} alignItems={"start"}>
//                    <Grid item container lg={9} xs={12} height={{ lg: '18vh' }} borderRadius={'1rem'} mt={{ lg: -5 }} bgcolor={Colors.white.main} boxShadow={'0px 0px 1px 1px #e8e7e7'} >
//                         <Grid item container lg={12} >
//                             <Grid item container justifyContent={"center"} alignItems={"center"} flexDirection={"column"} lg={12} md={12}>
//                                 <Box sx={{
//                                     width: '90%',
//                                     height: '55px',
//                                     // borderRadius: '20rem',
//                                     backgroundColor: 'white.main',
//                                     border:'none',
//                                     outline:'none',
//                                     borderBottom: `1px solid ${Colors.white.main}`,
//                                     color: Colors.red[500],
//                                     display: 'flex'
//                                 }} justifyContent={""} alignItems={"center"}>
//                                     <MInput
//                                         value={value}
//                                         onChange={(e:any)=>setValue(e.target.value)}
//                                         sx={{
//                                             width: '95%', outline: 'none',
//                                             "& .MuiFormHelperText-root": {
//                                                 fontFamily: 'Yekan Bakh Medium',
//                                                 color: Colors.red[500] + "!important",
//                                             },
//                                             "& .MuiInputLabel-root": {
//                                                 background: Colors.white.main + "!important",
//                                                 color: Colors.black.main + "!important"
//                                             },
//                                             // height: '55px'
//                                         }} search id="outlined-basic" label="جست و جو . . ." variant="outlined"/>

//                                 </Box>
//                             </Grid>
//                         </Grid>
//                         <Grid item container lg={12} justifyContent={'center'} >
//                             <Typography variant="subtitle2">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ </Typography>
//                         </Grid>
//                     </Grid>
//                 </Grid> */}
//             </Grid>
//         </>


//     )
// }
// export default LandingPage


import React, { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Grid, Typography } from '@mui/material'
import Image from "next/image";
import Ubc from "@/Assets/images/Rectangle 34.png";
import Ubc1 from "@/Assets/images/Artboard 1 (3) 1 (1).png";
import colors from '@/Assets/theme/base/colors';
import MInput from '@/Components/Minput';
import { Box } from 'devextreme-react';

const items = [
    {
        name: "Random Name #1",
        description: "Probably the most random thing you have ever seen!",
        img: Ubc,
        color: '#FEC101'
    },
    {
        name: "Random Name #2",
        description: "Probably the most random thing you have ever seen!",
        img: Ubc1,
        color: 'red.main'
    },
    {
        name: "Random Name #2",
        description: "Probably the most random thing you have ever seen!",
        img: Ubc1,
        color: 'white.main'
    }
];

const Example = (props: any) => {
    const [Product, setProduct] = React.useState<any[]>([])
    React.useEffect(() => {
        const GetData = async () => {
            const response = await fetch('https://farhangian.birkar.ir/api/Advertisement/GetAll')
            const data = await response.json()
            setProduct(data.data)
        }
        GetData()
    }, [])
    return (
        <Carousel>
            {Product.map((item, i) => <Item key={i} item={item} />)}
        </Carousel>
    );
};

export default Example;

const Item = (props: any) => {
    return (
        <Paper sx={{ maxHeight: {lg:'60vh' , xs:'60vh'}, minHeight: {lg:'60vh' , xs:'50vh'}, display: 'flex' }}>
           <Grid item container lg={12} justifyContent={'center'} flexDirection={{xs:'column-reverse' , lg:'row' , sm:'row' , md:'row'}}>
           <Grid container justifyContent={'start'} bgcolor={props.item.color} alignItems={'center'} flexDirection={'column'} lg={3} sm={3}>
                <Typography variant='h4'>{props.item.title}</Typography>
                <Typography variant='h1'>{props.item.description}</Typography>
                {/* <Button className="CheckButton">
                    Check it out!
                </Button> */}
            </Grid>
            <Grid item container lg={9} sm={9} justifyContent={'center'} bgcolor={props.item.color} alignItems={'center'} overflow={'hidden'}>
                <div className="carouselInner1"
                    // onClick={() => navigate(`/dashboard/${images[currImg].id}`)}
                    style={{
                        // backgroundImage: `url(${Test[currImg].img})`,
                        cursor: 'pointer',
                        backgroundSize: 'cover', // Make sure the image covers the area without being stretched
                        backgroundPosition: 'center', // Center the background image
                        width: '100%', // Ensure the div takes the full width of its parent
                        height: '100%' // Ensure the div takes the full height of its parent
                    }}
                >
                    <img src={`https://farhangian.birkar.ir/${props.item.image}`}  style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={'images'} />


                </div>

                {/* <Image src={`https://farhangian.birkar.ir/${props.item.image}`} width={1100} height={500}  quality={100} sizes="100vw" style={{ objectFit: 'cover' }} alt={'images'} /> */}
            </Grid>
            
           </Grid>
        </Paper>
    );
};