import {styled} from "@mui/material/styles";
import {Select, Theme} from "@mui/material";
import colors from "@/Assets/theme/base/colors";

interface owner {
    fullWidth?: boolean
    helperText?: string
    border?: string
    error?: string
    bgColor?: boolean
    direction?: boolean
    login?: string
    value?: string
    popup?: string
    internShip?: boolean
    form?: boolean
    fullHeight?: boolean
}

interface InputProps {
    ownerState: owner;
    theme?: Theme;
}

export default styled(Select)(({theme, ownerState}: any) => {
    const {
        border,
        direction,
        login,
        form,
        bgColor,
        fullHeight,
        popup,
        internShip,
        error,
        fullWidth,
        height
    } = ownerState

    function formStyle() {
        return (
            {
                '& .MuiSelect-root': {
                    fontSize: "50rem",
                    fontWeight: "bold",
                    height: "3.2rem !important",
                    color: colors.black.main + "!important",
                    backgroundColor:'red.main'
                    // padding: "0.1rem 0 !important",
                    // border: "1px solid black",
                    // height: "10px",
                },
                "& .MuiSelect-select": {
                    border: error ? "1px solid red" : "0px solid gray",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    alignItems: "center",
                    display: "flex",
                    height: "2rem !important",
                    width: "17rem !important",

                },
                "& .MuiInputLabel-root": {
                    color: "green"
                },
                "& .MuiSelect-icon": {
                    // marginRight: "80%",
                    color: "black"
                },
                '.MuiOutlinedInput-notchedOutline': {
                    color: colors.black.main + "!important",
                    // border: "none !important",
                    backgroundColor: "transparent !important",
                }
            }
        )
    }


    return {
        width: fullWidth && "100%",
        // height: fullHeight ? "100%" : height,
        fontWeight: "bold",
        direction: direction,
        backgroundColor: bgColor + "!important",
        ...(form && formStyle()),
    }
})
