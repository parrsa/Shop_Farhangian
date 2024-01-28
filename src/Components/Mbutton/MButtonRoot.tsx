import { styled } from "@mui/material/styles";
import { Button, SxProps, Theme, useTheme } from "@mui/material";
import colors from "../../Assets/theme/base/colors";

interface owner {
    width?: string
    height?: string
    color?: string
    variant?: string
    size?: string
    circular?: boolean
    iconOnly?: boolean
    border?: string
    borderRadius?: string
    bgColor?: string
    positon?: string
    marginTop?: string
    selectimages?:boolean
    login?: boolean
    register?: boolean
    category?: boolean
    submite?: boolean
    submit?: boolean
    ShowProfile?: boolean
    location?: boolean
    common?: boolean
    darkMode?: boolean
    fullWidth?: boolean
    fullHeight?: boolean
    sx?: SxProps
}

interface styledProps {
    theme?: Theme
    ownerState: owner
}

export default styled(Button)(({ theme, ownerState }: any) => {
    const { border, direction, category, submite,selectimages,
        ShowProfile,
        register, login, form, search, bgColor, fullHeight, popup, internShip, error, fullWidth, height, txt } = ownerState

    function RegisterStyle() {
        return (
            {
                '&.Mui-disabled': {
                    opacity: 0.5,
                },
                fontFamily: 'Yekan Bakh Medium',
                border: `1px solid ${colors.blue[500]}`,
                borderRadius: '0.5rem',
                backgroundColor: colors.blue[500],
                width: "20rem",
                fontSize: '0.90rem',
                fontWeight: 'bold',
                height: '3rem',
                color: colors.black.main,
                "&:hover": {
                    color: colors.white.main + "!important",
                    backgroundColor: colors.black.main,
                    border: `1px solid ${colors.white.main}`
                },

                "&:focus": {
                    color: colors.white.main,
                    backgroundColor: colors.black.main,
                    border: `1px solid ${colors.success}`
                }
            }

        )
    }

    function SelectImages(){
        return (
            {
                '&.Mui-disabled': {
                    opacity: 0.5,
                },
                fontFamily: 'Yekan Bakh Medium',
                border: error ? "1px solid red" : "1px solid #C4C4C4",
                // borderRadius: '0.5rem',
                backgroundColor: colors.white.main,
                padding: "0.1rem 0 !important",
                width: "20rem",
                // height:'55px',
                fontSize: '0.90rem',
                fontWeight: 'bold',
                height: '3.5rem',
                color: colors.black.main,
                "&:hover": {
                    // color: colors.white.main + "!important",
                    backgroundColor: colors.white.main,
                    border: `1px solid ${colors.white.main}`
                },

                "&:focus": {
                    color: colors.white.main,
                    backgroundColor: colors.black.main,
                    border: `1px solid ${colors.success}`
                }
            }

        )
    }

    function loginStyle() {
        return (
            {
                border: `1px solid ${colors.black.main}`,
                // borderRadius: '2rem',
                backgroundColor: colors.black.main,
                color: "white",
                width: "10rem",
                height: '2.8rem',
                "&:hover": {
                    color: colors.white.main + "!important",
                    backgroundColor: colors.black.main,
                    border: `1px solid ${colors.white.main}`
                },
                "&:focus": {
                    color: colors.white.main,
                    backgroundColor: colors.black.main,
                    border: `1px solid ${colors.success}`
                }
            }

        )
    }


    function CategorysBtn() {
        return (
            {
                // border: `1px solid ${colors.kaarnas.yellow}`,
                borderRadius: '2rem',
                backgroundColor: colors.black.main,
                color: "black",
                width: "10rem",
                fontFamily: 'Yekan Bakh Medium',
                fontSize: "15px",
                fontWeight: "900",
                height: '2.5rem',
                "&:hover": {
                    color: colors.white.main + "!important",
                    backgroundColor: colors.black.main,
                    border: `1px solid ${colors.white.main}`
                },
                "&:focus": {
                    color: colors.white.main,
                    backgroundColor: colors.black.main,
                    border: `1px solid ${colors.success}`
                }
            }

        )
    }


    function Submite() {
        return (
            {
                // border: `1px solid ${colors.kaarnas.yellow}`,
                // borderRadius: '2rem',
                backgroundColor: colors.black.main,
                color: "white",
                width: "10rem",
                fontFamily: 'Yekan Bakh Medium',
                fontSize: "15px",
                fontWeight: "900",
                height: '2.8rem',
                "&:hover": {
                    color: colors.white.main + "!important",
                    backgroundColor: colors.black.main,
                    border: `1px solid ${colors.white.main}`
                },
                "&:focus": {
                    color: colors.white.main,
                    backgroundColor: colors.black.main,
                    border: `1px solid ${colors.success}`
                }
            }

        )
    }

    function ShowProfileBtn() {
        return (
            {

                border: `1px solid ${colors.black.main}`,
                borderRadius: '2rem',
                backgroundColor: colors.black.main,
                color: "white",
                width: "12rem",
                fontFamily: 'Yekan Bakh Medium',
                height: '2.5rem',
                "&:hover": {
                    color: colors.white.main + "!important",
                    backgroundColor: colors.black.main,
                    border: `1px solid ${colors.white.main}`
                },
                "&:focus": {
                    color: colors.white.main,
                    backgroundColor: colors.black.main,
                    border: `1px solid ${colors.success}`
                }
            }
        )
    }

    return {
        backgroundColor: bgColor + "!important",
        width: fullWidth ? "100% !important" : fullWidth,
        // height: fullHeight ? "100% !important" : height,
        ...(submite && Submite()),
        ...(login && loginStyle()),
        ...(category && CategorysBtn()),
        ...(ShowProfile && ShowProfileBtn()),
        ...(selectimages && SelectImages()),
        ...(register && RegisterStyle()),
    }
})
