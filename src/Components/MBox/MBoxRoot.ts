import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import {ISboxRoot} from "@/Types/MUI/Components/SBox.types";
import colors from "@/Assets/theme/base/colors";


const MBoxRoot = styled(Box)<ISboxRoot>(({customstats}) => {
    const {
        circlebox,
        backgroundImage,
        Charts,
        Modal,
        UserState,
        backUrl,
        backProp,
        width,
        Discount,
        height,
        position,
        bgColor,
        blurBackground,
        borderRadius,
    } = customstats


    function backGroundType() {
        switch (backProp) {
            case "cover" :
                return {
                    backgroundColor: "red !important",
                    backgroundSize: "cover",

                }
            case "contain" :
                return {
                    backgroundSize: "contain"
                }
                break;
        }

        return {
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }
    }

    function BackImage() {
        return {
            backgroundImage: `url("${backUrl}") `,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center',
            width:'100%'

        }
    }

    function BoxModal(){
        return{
            position:'absolute',
            top:'50%',
            left:'50%',
            width:600,
            transform:'translate(-50%, -50%)',
            backgroundColor:'red.main',
            border:'2px solid #000',
            boxShadow:24,
            p:4
  }
    }

    function blurBackStyles() {
        return {
            width:'100%',
            background: `linear-gradient(rgba(255, 255, 255, .17), #FFB800), url("${backUrl}") !important`,
        }
    }

    function UserStateStyle() {
        return {
            width: '16rem',
            borderRadius:'0.5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.farhangian.blue,
        }
    }

    function DisCcounrBox() {
        return {
            width: '100%',
            height:'10rem',
            borderRadius:'0.5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.farhangian.blue,
        }
    }

    function Chart() {
        return {
            width: '25%',
            height:'10rem',
            borderRadius:'0.5rem',
            backgroundColor: colors.farhangian.blue,
        }
    }


    function CircleBox() {
        return {
            width: '3.2rem',
            height: '3.2rem',
            borderRadius: '50%',
            display: 'flex',
            flexDirection:'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.farhangian.blue,
        }
    }

    return {
        width,
        height,
        borderRadius,
        position,
        ...(blurBackground && blurBackStyles()),
        ...(backProp && backGroundType()),
        ...(UserState && UserStateStyle()),
        ...(backgroundImage && BackImage()),
        ...(circlebox && CircleBox()),
        ...(Discount && DisCcounrBox()),
        ...(Charts && Chart()),
        ...(Modal && BoxModal()),

    }
})

export default MBoxRoot
