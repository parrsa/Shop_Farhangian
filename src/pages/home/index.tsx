import logo from "@/Assets/images/[fpdl 1.png";
import Image from "next/image";
import React from "react";
import DashboardLayout from "@/Components/Dashboard/Layout";
import {Grid} from "@mui/material";
import LandingPage from "@/pages/home/LandingPages";
import ProductDescount from "@/pages/home/ProductDescount";
import NewProduct from "@/pages/home/NewProduct";
import News from "@/pages/home/News";
const Homes = () => {

    return (
        <DashboardLayout>
            <LandingPage/>
            <ProductDescount/>
            <NewProduct/>
            <News/>
        </DashboardLayout>
    )
}
export default Homes
