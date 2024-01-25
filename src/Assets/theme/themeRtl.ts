import {createTheme} from '@mui/material';
import { alpha,  lighten, darken } from '@mui/material';

// import colors from "./base/colors";

import borders from "./base/borders";
import boxShadows from "./base/boxShadows";
import BoxShadow from "./functions/boxShadow";
import gradientChartLine from "./functions/gradientChartLine";
import hexToRgb from "./functions/hexToRgb";
import linearGradient from "./functions/linearGradient";
import rgba from "./functions/rgba";
import pxToRem from "./functions/pxToRem";
import colorss from './base/colors'
import typography from "@/Assets/theme/base/typography";

const themeRtl= createTheme({
    direction: "rtl",
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1840
        }
    },
    spacing: 9,
    palette: { ... colorss,
        mode: 'light',
    },
    border: {...borders},
    boxShadow: {...boxShadows},
    functions: {
        BoxShadow,
        gradientChartLine,
        hexToRgb,
        linearGradient,
        rgba,
        pxToRem
    },
    components: {
        MuiTypography:{...typography}
    }
});
export default themeRtl
