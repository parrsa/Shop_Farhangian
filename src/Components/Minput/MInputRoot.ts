import {styled} from "@mui/material/styles";
import {TextField, Theme} from "@mui/material";
import colors from "../../Assets/theme/base/colors";

// import datasource from "@/pages/datasource";

interface owner {
    fullWidth?: boolean
    helperText?: string
    border?: string
    error?: string
    bgColor?: boolean
    direction?: boolean
    login?: string
    serach?: boolean
    value?: string
    popup?: string
    internShip?: boolean
    verify?: boolean
    form?: boolean
    date?: boolean
    fullHeight?: boolean
    datasource?: boolean
    selectBox?: boolean
    textarea?:boolean
}

interface InputProps {
    ownerState: owner;
    theme?: Theme;
}

export default styled(TextField)(({theme, ownerState}: any) => {
    const {
        border,
        datasource,
        textarea,
        selectBox,
        date,
        direction,
        login,
        form,
        search,
        bgColor,
        fullHeight,
        popup,
        verify,
        internShip,
        error,
        fullWidth,
        width,
        height,
        txt
    } = ownerState

    function loginStyle() {
        return (
            {
                '& .MuiFormHelperText-root': {
                    color: theme.palette.error.light + "!important",
                    fontSize: ".8rem",
                    fontWeight: "bold",
                    padding: "0.1rem 0 !important"
                },
                "& .MuiOutlinedInput-notchedOutline": {
                    border: 0,
                },
                "& .MuiInputBase-root": {
                    border: 0,
                    fontSize: "1rem",
                    fontWeight: "bold"
                },
                "& .MuiInputLabel-root": {
                    fontSize: "1rem",
                    fontWeight: "bold !important",
                    background: theme.palette.white.main + "!important",
                    borderRadius: "10px !important",
                    color: theme.palette.secondary.main + "!important",
                    padding: "0 10px !important",
                    marginLeft: "65%",
                }
            })
    }

    function formStyle() {
        return {
            border: "1px solid #ccc",
            borderRadius: "2rem !important",
            boxShadow: "-1px 10px 39px 0px rgba(189,178,189,1)",
            backgroundColor: "white",
            '& .MuiFormHelperText-root': {
                fontSize: ".85rem",
                fontWeight: "bold",
                padding: "0.1rem 0 !important"
            },
            "& .MuiOutlinedInput-notchedOutline": {
                border: 0,
            },
            "& .MuiInputBase-root": {
                borderRadius: "1rem",
                border: error ? "1px solid red" : 0,
                fontSize: "1rem !important",
                padding: "1rem .5rem !important",
                fontWeight: "bold",
                backgroundColor: theme.palette.white.main + "!important",
            },
            "& .MuiInputLabel-root": {
                fontFamily: "iranSans",
                fontSize: "1rem",
                fontWeight: "bold !important",
                background: "white" + "!important",
                borderRadius: "10px !important",
                color: "#918686" + "!important",
                padding: ".8rem   10px !important",
            }
        }
    }

    function popupStyle() {
        return (
            {

                '& .MuiFormHelperText-root': {
                    color: theme.palette.error.light + "!important",
                    fontSize: ".84rem",
                    fontWeight: "bold",
                    padding: "0.1rem 0 !important",
                    fontFamily: 'Yekan Bakh Hairline',
                    height: "10px",
                },
                "& .MuiInputBase-root": {
                    border: error ? "1px solid red" : "0px solid gray",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    backgroundColor: theme.palette.white.main + "!important",
                    width: '20rem',
                    height: "3.2rem !important"
                },
                '& .Mui-focused': {
                    border: '0px',
                },
                "& .MuiInputLabel-root": {
                    fontFamily: 'Yekan Bakh Hairline',
                    fontSize: "1rem",
                    fontWeight: "bold !important",
                    background: theme.palette.white.main + "!important",
                    borderRadius: "10px !important",
                    color: colors.black.main + "!important",
                    padding: "0 10px !important",
                },
                "& .MuiOutlinedInput-notchedOutline": {

                    backgroundColor: "transparent !important"
                }
            }
        )
    }


    function DatasourceInput() {
        return (
            {

                '& .MuiFormHelperText-root': {
                    color: theme.palette.error.light + "!important",
                    fontSize: ".84rem",
                    fontWeight: "bold",
                    padding: "0.1rem 0 !important",
                    fontFamily: 'Yekan Bakh Hairline',
                    height: "10px",
                },
                "& .MuiInputBase-root": {
                    border: error ? "1px solid red" : "0px solid gray",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    backgroundColor: theme.palette.white.main + "!important",
                    width: '20rem',
                    height: "3.2rem !important"
                },
                '& .Mui-focused': {
                    border: '0px',
                },
                "& .MuiInputLabel-root": {
                    fontFamily: 'Yekan Bakh Hairline',
                    fontSize: "1rem",
                    fontWeight: "bold !important",
                    background: theme.palette.white.main + "!important",
                    borderRadius: "10px !important",
                    color: colors.black.main + "!important",
                    padding: "0 10px !important",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: error ? " red" : "",
                    backgroundColor: "transparent !important"
                }
            }
        )
    }

    function Text() {
        return {
            '& .MuiFormHelperText-root': {
                color: " !important",
                fontSize: ".84rem",
                fontWeight: "bold",
                padding: "0.1rem 0 !important",
                border: "1px solid black",
                height: "10px"
            },
            "& .MuiInputBase-root": {
                border: error ? "1px solid red" : "1px solid black",
                fontWeight: "bold",
                fontSize: "1rem",
                backgroundColor: theme.palette.white.main + "!important",
                height: "3rem !important"
            },
            "& .MuiInputLabel-root": {
                fontSize: "1rem",
                fontWeight: "bold !important",
                background: theme.palette.white.main + "!important",
                borderRadius: "10px !important",
                color: theme.palette.secondary.formInputText + "!important",
                padding: "0 10px !important",
                marginLeft: "70%"
            },
            "& .MuiOutlinedInput-notchedOutline": {
                marginLeft: "65%",
                border: "none !important",
                backgroundColor: "transparent !important"
            }
        }
    }

    function internStyle() {
        // return {
        //     border: "1px solid #ccc",
        //     height: fullHeight && "100% !important",
        //     /*
        //                 padding:".4rem .7rem",
        //     */
        //     borderRadius: "2rem !important",
        //     '& .MuiFormHelperText-root': {
        //         fontSize: ".85rem",
        //         fontWeight: "bold",
        //         padding: "0.1rem 0 !important"
        //     },
        //     "& .MuiOutlinedInput-notchedOutline": {
        //         border: 0,
        //     },
        //     "& .MuiInputBase-root": {
        //         height: fullHeight && "100% !important",
        //         borderRadius: "1rem",
        //         border: error ? "1px solid red" : 0,
        //         fontSize: "1rem !important",
        //         padding: ".1rem .5rem !important",
        //         fontWeight: "bold",
        //         backgroundColor: "#EAEBF3",

        //     },
        //     "& .MuiInputLabel-root": {
        //         fontFamily: "iranSans",
        //         fontSize: "1rem",
        //         fontWeight: "bold !important",
        //         backgroundColor: "#EAEBF3 !important",
        //         borderRadius: "10px !important",
        //         color: "#918686" + "!important",
        //         padding: ".3rem   10px !important"
        //     },

        // }

        return {
            '& .MuiFormHelperText-root': {
                color: " !important",
                fontSize: ".84rem",
                fontWeight: "bold",
                padding: "0.1rem 0 !important",
                border: "1px solid black",
                height: "10px"
            },
            "& .MuiInputBase-root": {
                border: error ? "1px solid red" : "1px solid black",
                fontWeight: "bold",
                fontSize: "1rem",
                backgroundColor: theme.palette.white.main + "!important",
                height: "3rem !important"
            },
            "& .MuiInputLabel-root": {
                fontSize: "1rem",
                fontWeight: "bold !important",
                background: theme.palette.white.main + "!important",
                borderRadius: "10px !important",
                color: theme.palette.secondary.formInputText + "!important",
                padding: "0 10px !important",
                marginLeft: "45%"
            },
            "& .MuiOutlinedInput-notchedOutline": {
                marginLeft: "65%",
                border: "none !important",
                backgroundColor: "transparent !important"
            }
        }
    }


    function VerifyCodeStyle() {
        // return {
        //     border: "1px solid #ccc",
        //     height: fullHeight && "100% !important",
        //     /*
        //                 padding:".4rem .7rem",
        //     */
        //     borderRadius: "2rem !important",
        //     '& .MuiFormHelperText-root': {
        //         fontSize: ".85rem",
        //         fontWeight: "bold",
        //         padding: "0.1rem 0 !important"
        //     },
        //     "& .MuiOutlinedInput-notchedOutline": {
        //         border: 0,
        //     },
        //     "& .MuiInputBase-root": {
        //         height: fullHeight && "100% !important",
        //         borderRadius: "1rem",
        //         border: error ? "1px solid red" : 0,
        //         fontSize: "1rem !important",
        //         padding: ".1rem .5rem !important",
        //         fontWeight: "bold",
        //         backgroundColor: "#EAEBF3",

        //     },
        //     "& .MuiInputLabel-root": {
        //         fontFamily: "iranSans",
        //         fontSize: "1rem",
        //         fontWeight: "bold !important",
        //         backgroundColor: "#EAEBF3 !important",
        //         borderRadius: "10px !important",
        //         color: "#918686" + "!important",
        //         padding: ".3rem   10px !important"
        //     },

        // }

        return {
            '& .MuiFormHelperText-root': {
                color: " !important",
                fontSize: "4rem",
                fontWeight: "bold",
                padding: "0.1rem 0 !important",
                border: "0px solid #fff",
                height: "10px",
                textAlign: "center",
            },
            "& .MuiInputBase-root": {
                border: error ? "1px solid red" : "0px solid black",
                fontWeight: "bold",
                fontSize: "1rem",
                backgroundColor: '#D9D9D94D' + "!important",
                TextAlign: 'center',
                height: "3rem !important"
            },
            "& .MuiInputLabel-root": {
                fontSize: "1rem",
                fontWeight: "bold !important",
                background: theme.palette.white.main + "!important",
                borderRadius: "10px !important",
                color: theme.palette.secondary.formInputText + "!important",
                padding: "0 10px !important",
                marginLeft: "45%"
            },

        }
    }

    function StyleSerachBox() {
        return (
            {
                '& .MuiFormHelperText-root': {
                    color: colors.white.main + "!important",
                    fontSize: ".8rem",
                    fontWeight: "bold",
                    padding: "0.1rem 0 !important",
                    fontFamily: 'Yekan Bakh Thin',

                },
                "& .MuiOutlinedInput-notchedOutline": {
                    border: 0,
                    fontFamily: 'Yekan Bakh Thin',


                },
                "& .MuiInputBase-root": {
                    border: 0,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: colors.black.main + "!important",
                    fontFamily: 'Yekan Bakh Thin',

                },
                "& .MuiInputLabel-root": {
                    fontFamily: 'Yekan Bakh Thin',
                    fontSize: "1rem",
                    fontWeight: "bold !important",
                    background: '#2A2A2A' + "!important",
                    borderRadius: "10px !important",
                    color: colors.white.main + "!important",
                    padding: "0 10px !important",
                }
            })

    }


    function Date() {
        return (
            {

                '& .MuiFormHelperText-root': {
                    color: theme.palette.error.light + "!important",
                    fontSize: ".84rem",
                    fontWeight: "bold",
                    padding: "0.1rem 0 !important",
                    fontFamily: 'Yekan Bakh Hairline',
                    height: "10px",
                },
                "& .MuiInputBase-root": {
                    border: error ? "1px solid red" : "0px solid gray",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    backgroundColor: theme.palette.white.main + "!important",
                    width: '10rem',
                    height: "3.2rem !important"
                },
                '& .Mui-focused': {
                    border: '0px',
                },
                "& .MuiInputLabel-root": {
                    fontFamily: 'Yekan Bakh Hairline',
                    fontSize: "1rem",
                    fontWeight: "bold !important",
                    background: theme.palette.white.main + "!important",
                    borderRadius: "10px !important",
                    color: colors.black.main + "!important",
                    padding: "0 10px !important",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: error ? " red" : " #4B48EF",
                    backgroundColor: "transparent !important"
                }
            }
        )
    }

    function SelectrouterDatasource() {
        return (
            {
                '& .MuiFormHelperText-root': {
                    color: theme.palette.error.light + "!important",
                    fontSize: ".84rem",
                    fontWeight: "bold",
                    padding: "0.1rem 0 !important",
                    fontFamily: 'Yekan Bakh Hairline',
                    height: "10px",

                },
                "& .MuiInputBase-root": {
                    border: error ? "1px solid red" : "0px solid gray",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    fontFamily: 'Yekan Bakh Hairline',

                    backgroundColor: theme.palette.white.main + "!important",
                    height: "3.2rem !important",
                },
                '& .Mui-focused': {
                    border: '0px',
                },
                "& .MuiInputLabel-root": {
                    fontFamily: 'Yekan Bakh Hairline',
                    fontSize: "1rem",
                    fontWeight: "bold !important",
                    background: theme.palette.white.main + "!important",
                    color: colors.black.main + "!important",
                    padding: "0 10px !important",

                },
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: error ? " red" : "",

                    backgroundColor: "transparent !important"
                }
            }
        )
    }
    function TextArea(){
        return (
            {

                '& .MuiFormHelperText-root': {
                    color: theme.palette.error.light + "!important",
                    fontSize: ".84rem",
                    fontWeight: "bold",
                    padding: "1rem 0 !important",
                    fontFamily: 'Yekan Bakh Hairline',
                    height: "10px",
                },
                "& .MuiInputBase-root": {
                    border: error ? "1px solid red" : "0px solid gray",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    backgroundColor: theme.palette.white.main + "!important",
                    padding:'15px'
                    // width: '20rem',
                    // height: "4rem !important"
                },
                '& .Mui-focused': {
                    border: '0px',
                },
                "& .MuiInputLabel-root": {
                    fontFamily: 'Yekan Bakh Hairline',
                    fontSize: "1rem",
                    fontWeight: "bold !important",
                    background: theme.palette.white.main + "!important",
                    borderRadius: "10px !important",
                    color: colors.black.main + "!important",
                    padding: "0 10px !important",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: error ? " red" : "",
                    backgroundColor: "transparent !important"
                }
            }
        )
    }
    return {
        width: fullWidth ? "100%" : width,
        // height: fullHeight ? "100%" : height,
        fontWeight: "bold",
        direction: direction,
        backgroundColor: bgColor + "!important",
        ...(popup && popupStyle()),
        ...(login && loginStyle()),
        ...(form && formStyle()),
        ...(txt && Text()),
        ...(internShip && internStyle()),
        ...(search && StyleSerachBox()),
        ...(verify && VerifyCodeStyle()),
        ...(date && Date()),
        ...(datasource && DatasourceInput()),
        ...(selectBox && SelectrouterDatasource()),
        ...(textarea && TextArea())
    }
})
