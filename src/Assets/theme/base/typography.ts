import { ComponentsOverrides, ComponentsProps, ComponentsVariants, Theme } from "@mui/material";
const typography: {
    defaultProps?: ComponentsProps['MuiTypography'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiTypography'];
    variants?: ComponentsVariants['MuiTypography'];
} = {
    defaultProps: {
    },
    styleOverrides: {
        root: {
            fontFamily: 'Yekan Bakh Medium',
            fontSize: "17px",
            color:'red.main'
        },
        body1: {
            fontWeight: 700,
            lineHeight: 4,
        },
        body2: {
            fontWeight: 900,
            lineHeight: 1.68,
            fontSize: "20px"
        },
        caption: {
            fontSize: '0.8rem',
            // lineHeight: 2.2,

        },
        subtitle1: {
            fontFamily: 'Yekan Bakh Medium',
            fontSize: '20px',
            color: '#333333',
            fontWeight: 500,
            lineHeight: 1.65
        },
        subtitle2: {
            fontFamily: 'Yekan Bakh Light',
            fontSize: '14px',
            color: "grey"
        },
        overline: {
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.5px',
            lineHeight: 2.5,
            textTransform: 'uppercase'
        },
        h1: {
            fontWeight: 900,
            lineHeight: 1.2
        },
        h2: {
            fontWeight: 700,
            fontSize: '3rem',
            lineHeight: 1
        },
        h3: {
            fontFamily: 'Kalameh REGULAR',
            fontWeight: 700,
        },
        h4: {
            fontFamily: 'Yekan Bakh Medium',
            fontWeight: 900,
            fontSize: '2rem',
            lineHeight: 1.2
        },
        h5: {
            fontWeight: 700,
            fontSize: '1.5rem',
            lineHeight: 1.2
        },
        h6: {
            fontWeight: 700,
            fontSize: '1.125rem',
            lineHeight: 1.2
        }
    }
}
export default typography
