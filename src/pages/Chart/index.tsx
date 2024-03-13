"use client"

import React from "react";
import styled from "@emotion/styled";
import {Tree, TreeNode} from "react-organizational-chart";
import DashboardLayout from "@/Components/Dashboard/Layout";
import {Avatar, Box, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {OrganizationChart} from 'primereact/organizationchart';

import dynamic from "next/dynamic";
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
            style: { borderRadius: '12px' , width:380 , backgroundColor:'blue' },
            data: {
                image: 'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png',
                name: 'Amy Elsner',
                title: 'CEO'
            },
            children: [
                {
                    expanded: true,
                    type: 'person',
                    className: 'bg-purple-500',
                    style: { borderRadius: '12px' },
                    data: {
                        image: 'https://primefaces.org/cdn/primereact/images/avatar/annafali.png',
                        name: 'Anna Fali',
                        title: 'CMO'
                    },
                },
                {
                    expanded: true,
                    type: 'person',
                    className: 'bg-teal-500',
                    style: { borderRadius: '12px' },
                    data: {
                        image: 'https://primefaces.org/cdn/primereact/images/avatar/stephenshaw.png',
                        name: 'Stephen Shaw',
                        title: 'CTO'
                    },
                },
                {
                    expanded: true,
                    type: 'person',
                    className: 'bg-teal-500',
                    style: { borderRadius: '12px' },
                    data: {
                        image: 'https://primefaces.org/cdn/primereact/images/avatar/stephenshaw.png',
                        name: 'Stephen Shaw',
                        title: 'CTO'
                    },
                }



            ]
        }
    ]);

    const nodeTemplate = (node:any) => {
        if (node.type === 'person') {
            return (
                <Box sx={{ display: 'flex', flexDirection: 'column' , width:380  }}>
                    <Grid container justifyContent="center">
                        <Grid item container lg={12} justifyContent={'center'} alignItems={'center'}>
                            <Avatar alt={node.data.name} src={node.data.image} sx={{ width: 50, height: 50, mb: 3 }} />
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>{node.data.name}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">{node.data.title}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            );
        }

        return node.label;
    };
    return (
        <DashboardLayout>
            {/*<Organizational/>*/}
            <Grid item container lg={12} justifyContent={'center'} alignItems={'center'} bgcolor={'red.main'} sx={{
                padding: '2rem',
                borderRadius: '10px',
                marginBottom: '1rem'

            }}>
                <OrganizationChart value={data} nodeTemplate={nodeTemplate} />
            </Grid>

        </DashboardLayout>
    )
}

export default StyledTreeExample;
