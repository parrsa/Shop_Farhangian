import React from "react";
import { OrganizationChart } from 'primereact/organizationchart';
import Image from "next/image";
import { Box, Grid, Typography } from "@mui/material";
import DashboardLayout from "@/Components/Dashboard/Layout";
import Images from '@/Assets/images/khatooni.jpg'
import ImagesMahmodi from '@/Assets/images/Mahmodi.jpg'
import ImagesNosrati from '@/Assets/images/Nosrati.jpg'
import Imageskarimi from '@/Assets/images/karimi.jpg'
import ImagesEbrahimi from '@/Assets/images/Ebrahimi.jpg'
import Imagesamjadi from '@/Assets/images/amjadi.jpg'
import Imageskhosraviani from '@/Assets/images/khosraviani.jpg'

const StyledTreeExample = () => {
    const [data] = React.useState([
        {
            expanded: true,
            type: 'person',
            className: 'bg-indigo-500',
            style: { borderRadius: '12px', width: 380, padding: '5px', boxShadow: '0px 0px 1px 1px #e8e7e7' },
            data: {
                image: Imageskarimi,
                name: 'محمد کریمی',
                title: 'رئیس هیات مدیره لیسانس آموزش ابتدایی'
            },
            children: [
                {
                    expanded: true,
                    type: 'person',
                    className: 'bg-purple-500',
                    style: { borderRadius: '12px', width: 380, padding: '5px', boxShadow: '0px 0px 1px 1px #e8e7e7' },
                    data: {
                        image: ImagesNosrati,
                        name: 'منصور نصرتی',
                        title: 'شعار نائیب رئیس فوق لیسانس مدیریت آموزشی'
                    },
                    children: [
                        {
                            expanded: true,
                            type: 'person',
                            className: 'bg-purple-500',
                            style: { borderRadius: '12px', width: 380, padding: '5px', marginRight: 15, boxShadow: '0px 0px 1px 1px #e8e7e7' },
                            data: {
                                image: Imagesamjadi,
                                name: 'باقر امجدی',
                                title: 'بازرس شرکت لیسانس معارف اسلامی'
                            },
                        }
                    ]
                },
                {
                    expanded: true,
                    type: 'person',
                    className: 'bg-teal-500',
                    style: { borderRadius: '12px', width: 380, padding: '5px', marginRight: 15, boxShadow: '0px 0px 1px 1px #e8e7e7' },
                    data: {
                        image: ImagesEbrahimi,
                        name: 'ابراهیم ابراهیمی',
                        title: 'مدیر عامل و عضو هیات مدیره لیسانس ادبیات'
                    },
                    children: [
                        {
                            expanded: true,
                            type: 'person',
                            className: 'bg-purple-500',
                            style: { borderRadius: '12px', width: 380, padding: '5px', marginRight: 15, boxShadow: '0px 0px 1px 1px #e8e7e7' },
                            data: {
                                image: ImagesMahmodi,
                                name: 'خالد محمودی',
                                title: 'منشی فوق لیسانس معارف اسلامی'
                            },

                        }
                    ]

                },
                {
                    expanded: true,
                    type: 'person',
                    className: 'bg-teal-500',
                    style: { borderRadius: '12px', width: 380, padding: '5px', marginRight: 15, boxShadow: '0px 0px 1px 1px #e8e7e7' },
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
                            style: { borderRadius: '12px', width: 380, padding: '5px', marginRight: 15, boxShadow: '0px 0px 1px 1px #e8e7e7' },
                            data: {
                                image: Imageskhosraviani,
                                name: 'فتح الله خسرویانی',
                                title: 'بازرس شرکت لیسانس علوم اجتماعی'
                            },
                        }
                    ]
                }
            ]
        }
    ]);

    const nodeTemplate = (node: any ) => {
        if (node.type === 'person') {
            return (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={12} md={4} lg={5} container justifyContent="center">
                            <Image src={node.data.image} alt={node.data.name} width={150} height={150} style={{ borderRadius: '12px' }} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={8} lg={7} container direction="column" justifyContent="center">
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}>{node.data.name}</Typography>
                            <Typography variant="body2" color={'black.main'} sx={{ textAlign: 'center' }}>{node.data.title}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            );
        }
        return node.label;
    };

    return (
        <DashboardLayout>
            <Grid container justifyContent="center" sx={{ padding: '1rem' }}>
                <Grid item xs={12} lg={10} xl={8}>
                    <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
                        <OrganizationChart value={data} nodeTemplate={nodeTemplate} />
                    </div>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
};

export default StyledTreeExample;
