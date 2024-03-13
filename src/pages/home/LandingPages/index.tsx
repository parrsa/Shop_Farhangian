// import React, { useEffect, useState } from "react";
// import { Box, Grid, Typography } from "@mui/material";
// import Colors from "@/Assets/theme/base/colors";
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import Minput from "@/Components/Minput";
// import { images } from "./CarouselData";
// import Image from "next/image";
// import MBox from "@/Components/MBox";
//
// const LandingPage = () => {
//     const [array , setArray]=React.useState(images)
//     const [currImg, setCurrImg] = useState(0)
//
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
//
//     const handleImageChange = (cur:number) => {
//        setCurrImg(cur)
//     };
//
//     return (
//         <Grid container about="landing pages" sx={{ backgroundSize: 'cover' }} height={{ lg: "70vh", xs: '95vh', md: '100vh' }} justifyContent="center" alignItems="start">
//             <Grid item container height={{ lg: "65vh", xs: '95vh', md: '100vh' }}>
//                 <div className="carousel">
//                     <div className="carouselInner">
//                         <MBox backgroundImage backUrl={images[currImg].img.src} sx={{width:'100%' , height:'100%'}}>
//
//                         </MBox>
//                         {/*</div>*/}
//                         {/*<div className="left" onClick={() => handleImageChange("left")}>*/}
//                         {/*    <ArrowBackIcon sx={{ color: Colors.black.main }} />*/}
//                         {/*</div>*/}
//                         {/*<div className="right" onClick={() => handleImageChange("right")}>*/}
//                         {/*    <ArrowForwardIcon sx={{ color: Colors.black.main }} />*/}
//                         {/*</div>*/}
//
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
//
// export default LandingPage;


import React, {useEffect} from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Grid } from '@mui/material'
import Image from "next/image";
import Ubc from "@/Assets/images/Rectangle 34.png";
import Ubc1 from "@/Assets/images/Artboard 1 (3) 1 (1).png";
import MBox from "@/Components/MBox";

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
    const [Product,setProduct]=React.useState<any []>([])
    React.useEffect(()=>{
        const GetData=async ()=>{
            const response=await fetch('https://farhangian.birkar.ir/api/Advertisement/GetAll')
            const data=await response.json()
            setProduct(data.data)
        }
        GetData()
    },[])
    return (
        <Carousel>
            {Product.map((item, i) => <Item key={i} item={item} />)}
        </Carousel>
    );
};

export default Example;

const Item = (props: any) => {
    return (
        <Paper sx={{ maxHeight: '60vh', minHeight: '60vh', display: 'flex' }}>
            <Grid container justifyContent={'center'} bgcolor={props.item.color} alignItems={'center'} flexDirection={'column'} lg={6}>
                <h2>{props.item.title}</h2>
                <p>{props.item.description}</p>
                <Button className="CheckButton">
                    Check it out!
                </Button>
            </Grid>
            <Grid item container lg={6} justifyContent={'center'} bgcolor={props.item.color} alignItems={'center'} overflow={'hidden'}>
                <Image src={`https://farhangian.birkar.ir/${props.item.image}`} width={800} height={500}  quality={100} sizes="100vw" style={{ objectFit: 'cover' }} alt={'images'} />
            </Grid>
        </Paper>
    );
};

