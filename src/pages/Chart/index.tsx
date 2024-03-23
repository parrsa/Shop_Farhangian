"use client"

import React from "react";
import styled from "@emotion/styled";
import {Tree, TreeNode} from "react-organizational-chart";
import DashboardLayout from "@/Components/Dashboard/Layout";
import {Avatar, Box, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {OrganizationChart} from 'primereact/organizationchart';
import Images from '@/Assets/images/khatooni.jpg'
import ImagesMahmodi from '@/Assets/images/Mahmodi.jpg'
import ImagesNosrati from '@/Assets/images/Nosrati.jpg'
import Imageskarimi from '@/Assets/images/karimi.jpg'
import ImagesEbrahimi from '@/Assets/images/Ebrahimi.jpg'
import Imagesamjadi from '@/Assets/images/amjadi.jpg'
import Imageskhosraviani from '@/Assets/images/khosraviani.jpg'
import dynamic from "next/dynamic";
import Image from "next/image";
// const Organizational = dynamic(
//     () => import("./ChartData"),
//     {
//         ssr: false,
//     })
const StyledTreeExample = () => {
    const [data] = React.useState([
        {
            expanded: true,
            type: 'person',
            className: 'bg-indigo-500',
            style: { borderRadius: '12px' , width:380 ,padding:'5px', backgroundColor:'red' , },

            data: {
                image: Images,
                name: 'عبدالله خاتونی',
                title: 'عضو هیات مدیره فوق لیسانس اطلاع رسانی'
            },

            children: [
                {
                    expanded: true,
                    type: 'person',
                    className: 'bg-purple-500',
                    style: { borderRadius: '12px' , width:380 ,padding:'5px', backgroundColor:'red' , },
                    data: {
                        image: ImagesMahmodi,
                        name: ' خالد محمودی ',
                        title: 'منشی فوق لیسانس معارف اسلامی'
                    },
                    children: [
                        {
                            expanded: true,
                            type: 'person',
                            className: 'bg-purple-500',
                            style: { borderRadius: '12px' , width:380 ,padding:'5px',marginRight:15, backgroundColor:'red' , },
                            data: {
                                image: ImagesNosrati,
                                name: 'منصور نصرتی ',
                                title: 'شعار نائیب رئیس فوق لیسانس مدیریت آموزشی'
                            },
                        }
                    ]
                },
                {
                    expanded: true,
                    type: 'person',
                    className: 'bg-teal-500',
                    style: { borderRadius: '12px' , width:380 ,padding:'5px',marginRight:15, backgroundColor:'red' , },
                    data: {
                        image: Imageskarimi,
                        name: 'محمد کریمی  ',
                        title: 'رئیس هیات مدیره لیسانس آمزش ابتدایی'
                    },
                    children: [
                        {
                            expanded: true,
                            type: 'person',
                            className: 'bg-purple-500',
                            style: { borderRadius: '12px' , width:350 ,padding:'5px',marginRight:15, backgroundColor:'red' , },
                            data: {
                                image: ImagesEbrahimi,
                                name: ' ابراهیم ابراهیمی ',
                                title: 'مدیر عامل و عضو هیات مدیره لیسانس ادبیات'
                            },

                        }
                    ]

                },
                {
                    expanded: true,
                    type: 'person',
                    className: 'bg-teal-500',
                    style: { borderRadius: '12px' , width:380 ,padding:'5px',marginRight:15, backgroundColor:'red' , },
                    data: {
                        image: Imagesamjadi,
                        name: ' باقر امجدی ',
                        title: 'بازرس شرکت لیسانس معارف اسلامی'
                    },
                    children: [
                        {
                            expanded: true,
                            type: 'person',
                            className: 'bg-purple-500',
                            style: { borderRadius: '12px' , width:380 ,padding:'5px',marginRight:15, backgroundColor:'red', },
                            data: {
                                image: Imageskhosraviani,
                                name: 'فتح الله خسرویانی ',
                                title: 'بازرس شرکت لیسانس علوم اجتماعی'
                            },
                        }
                    ]


                }
            ]
        }
    ]);

    const nodeTemplate = (node:any) => {
        if (node.type === 'person') {
            return (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Grid container justifyContent="center" spacing={2} >
                        <Grid item xs={12} md={4} lg={5} container justifyContent="center">
                            <Image src={node.data.image} alt={node.data.name} width={150} height={150} style={{ borderRadius: '12px' }} />
                        </Grid>

                        <Grid item xs={12} md={8} lg={7} container direction="column" justifyContent="center">
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}>{node.data.name}</Typography>
                            <Typography variant="body2" sx={{ textAlign: 'center' }}>{node.data.title}</Typography>
                        </Grid>
                    </Grid>
                </Box>            );
        }

        return node.label;
    };
    return (
        <DashboardLayout>
            {/*<Organizational/>*/}
            <Grid item container lg={12}  justifyContent={'center'} alignItems={'center'}  sx={{
                padding: '5rem',
                borderRadius: '10px',
                marginBottom: '1rem',
                overflowX:'auto'
            }}>

                <OrganizationChart  value={data} nodeTemplate={nodeTemplate} />
            </Grid>

        </DashboardLayout>
    )
}

export default StyledTreeExample;
