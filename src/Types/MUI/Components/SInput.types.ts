import * as CSS from "csstype";
import {ChangeEventHandler} from "react";

export interface ISInput {
    fullWidth?: boolean;
    placeholder?: string;
    width?: CSS.Property.Width | number;
    border?: CSS.Property.Border | number;
    padding?: CSS.Property.Padding | number;
    height?: CSS.Property.Height | number;
    value?: string
    name?: string
    id?: string
    label?: string
    form?:boolean
    error?:boolean
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | undefined>
}

export interface ISInputRoot {
    customstats: ISInput
}