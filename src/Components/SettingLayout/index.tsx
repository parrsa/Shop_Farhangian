import { LayoutsInterface } from "@/Types/App/components.type"
import {Box, CssBaseline, Grid, Toolbar} from "@mui/material"
import Sidebar from "@/Components/Sidebar";
import Typography from "@mui/material/Typography";
import * as React from "react";
const SettingLayout: React.FC<LayoutsInterface> = ({ children }: LayoutsInterface) => {
    return (
        <Box sx={{ display: 'flex' ,minHeight:"100vh"}}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1,flexShrink:'initial',flexBasis:'8em',  color:'black.main' }}>
                <Grid item container justifyContent={'center'}  lg={12} md={11} xs={12} mt={1} sm={12}>
                    <Grid item container borderRadius={1} mt={1} lg={11} xs={8} p={1} justifyContent={'center'} bgcolor={'white.main'} boxShadow={5}>
                        <Typography variant={'h1'} p={0.5}>داشبورد مدیریتی</Typography>
                    </Grid>
                </Grid>
                {children}
            </Box>
        </Box>
    )
}
export default SettingLayout
