import SettingLayout from "@/Components/SettingLayout";
import {Grid} from "@mui/material";
import Image from "next/image";
import logo from "@/Assets/images/[fpdl 1.png";
import Cookies from "js-cookie";
import {useRouter} from "next/router";
import React from "react";

const Settings=()=>{

    const CookLogin=Cookies.get('TokenLogin')
    const CookStemp=Cookies.get('Stamp')
    const router=useRouter();

    // React.useEffect(()=>{
    //     if(!CookLogin && !CookStemp || CookStemp ==='Customer' ){
    //     router.push('/')
    //     }
    // },[CookLogin,CookStemp])
    return(
        <SettingLayout>
            <Grid item container justifyContent={'center'} alignItems={'center'} lg={12} xs={10} p={10} >
                <Image src={logo} alt={'pictrues website'} height={450} width={450} />
            </Grid>
        </SettingLayout>
    )
}
export default Settings
