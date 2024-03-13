import  {forwardRef} from "react";
import {ISBox} from "@/Types/MUI/Components/SBox.types";
import MBoxRoot from "@/Components/MBox/MBoxRoot";

const MBox = forwardRef<any,any>(
    (
        {
            backUrl,
            backProp,
            width,
            height,
            position,
            bgColor,
            sx,
            blurBackground,
            borderRadius,
            children,
            ...rest
        },
        ref
    ) =>{
        return(
            <MBoxRoot
                ref={ref}
                sx={sx}
                width={width}
                customstats={
                    {
                        backUrl,
                        backProp,
                        width,
                        height,
                        position,
                        bgColor,
                        blurBackground,
                        borderRadius,
                        ...rest
                    }
                }
            >
                {children}
            </MBoxRoot>
        )
    }
)

export default MBox
MBox.displayName="MBox"

// import { Box, BoxProps } from "@mui/material";
// import React from "react";
//
// interface MBoxRootProps extends BoxProps {
//     customstats?: {
//         backUrl?: string;
//         backProp?: boolean;
//         width?: string | number;
//         height?: string | number;
//         position?: string;
//         bgColor?: string;
//         blurBackground?: boolean;
//         borderRadius?: number;
//     };
// }
//
// const MBoxRoot: React.FC<MBoxRootProps> = ({ customstats, children, ...rest }) => {
//     return <Box {...rest}>{children}</Box>;
// };
//
// export default MBoxRoot;
