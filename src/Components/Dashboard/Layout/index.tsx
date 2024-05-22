import { LayoutsInterface } from "../../../Types/App/components.type"
import { Box, CssBaseline, Grid, Toolbar } from "@mui/material"
import Sidebar from "@/Components/Sidebar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Navbars from "@/Components/Navbar";
import NavTop from "@/Components/Navbar/NavTop";
import NavSearch from "@/Components/Navbar/NavSearch/NavSearch";
import Footer from "@/Components/Footer";
import Head from "next/head";

const DashboardLayout: React.FC<LayoutsInterface> = ({ children }: LayoutsInterface) => {
    return (
        <>
            <Head >
                <title>فروشگاه تعاونی مصرف فرهنگیان</title>
            </Head>
            <Grid sx={{ minHeight: '100vh' }}>
                <NavTop />
                <NavSearch />
                <Navbars />
                {children}
                <Footer />
            </Grid>
        </>
    )
}
export default DashboardLayout
