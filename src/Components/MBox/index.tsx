import React, {forwardRef} from "react";
import {ISBox} from "@/Types/MUI/Components/SBox.types";
import MBoxRoot from "@/Components/MBox/MBoxRoot";

// eslint-disable-next-line react/display-name
const MBox = React.forwardRef<HTMLDivElement,ISBox>(
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