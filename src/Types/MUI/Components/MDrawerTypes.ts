import {SxProps, Theme} from "@mui/material";
import * as CSS from "csstype";

export interface IsDrawer {
    openedMixin?:any
    theme?:Theme,
    open?:boolean | undefined
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
    blueCover?:boolean
    yellowCover?:boolean
    gradient?:boolean
    variant?:any
    blurBackground?:boolean
    overLayStyle?:"bluefill" | "yellowfill" | "blurCover"
    gradientColor?:"yellowGradient" | "blueGradient"
    position?: CSS.Property.Position
    children?: React.ReactNode
}

export interface IsDrawerRoot {
    open?:boolean
    closedMixin?:any
    openedMixin?:any
    customstats: IsDrawer
}
export interface ColorStop {
    color?: string;
    position?: number;
}