import React from "react";
import {SxProps} from "@mui/material";

export interface ISButton {
    type?: "button" | "submit" | "reset",
    color?: string,
    bgcolor?: string,
    fontSize?: string,
    width?: string,
    height?: string,
    textAlign?: string,
    padding?: string,
    margin?: string,
    sx?:SxProps,
    submit?: boolean,
    children?: React.ReactNode,
    onClick?:React.MouseEventHandler<HTMLButtonElement>

}

export interface ISButtonRoot{
    customstats:ISButton
}