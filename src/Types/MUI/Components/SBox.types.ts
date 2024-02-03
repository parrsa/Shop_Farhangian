import {SxProps} from "@mui/material";
import * as CSS from "csstype";

export interface ISBox {
    UserState?:boolean
    backUrl?:any
    bgColor?: CSS.Property.BackgroundColor
    sx?: SxProps
    borderRadius?:string;
    width?: CSS.Property.Width | number;
    height?: CSS.Property.Height | number
    logo?:boolean
    hGradient?:boolean
    backProp?:"cover" | "contain" |"repeat"
    coverBackground?:boolean
    backgroundImage?:boolean
    Discount?:boolean
    blueCover?:boolean
    yellowCover?:boolean
    gradient?:boolean
    blurBackground?:boolean
    overLayStyle?:"bluefill" | "yellowfill" | "blurCover"
    gradientColor?:"yellowGradient" | "blueGradient"
    position?: CSS.Property.Position
    children?: React.ReactNode
    circlebox?:boolean
    Charts?:boolean
    Modal?:boolean
}

export interface ISboxRoot {
    customstats: ISBox
}
export interface ColorStop {
    color?: string;
    position?: number;
}
