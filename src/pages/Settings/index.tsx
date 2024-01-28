import SettingLayout from "@/Components/SettingLayout";
import {Grid, Typography} from "@mui/material";
import Image from "next/image";
import logo from "@/Assets/images/[fpdl 1.png";
import Link from "next/link";

const Settings=()=>{
    return(
        <SettingLayout>
            <Grid item container justifyContent={'center'} alignItems={'center'} lg={12} xs={10} p={10} >
                <Image src={logo} alt={'pictrues website'} height={450} width={450} />
            </Grid>
        </SettingLayout>
    )
}
export default Settings
