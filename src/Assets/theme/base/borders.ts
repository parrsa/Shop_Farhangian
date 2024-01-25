import colors from "./colors";
import pxToRem from "../functions/pxToRem";

const {grey} = colors
const borders: BorderOptions = {
    borderColor: grey?.[300],
    borderWidth: {
        0: 0,
        1: pxToRem(1),
        2: pxToRem(2),
        3: pxToRem(3),
        4: pxToRem(4),
        5: pxToRem(5),
        6: pxToRem(6),
    },

    borderRadius: {
        xs: pxToRem(1.6),
        sm: pxToRem(2),
        md: pxToRem(6),
        lg: pxToRem(8),
        xl: pxToRem(12),
        xxl: pxToRem(16),
        section: pxToRem(160),
    }
}

export interface BorderOptions {
    borderColor: string | undefined;
    borderWidth: {
        0:number,
        1: string,
        2: string,
        3: string,
        4: string,
        5: string,
        6: string,

    };
    borderRadius: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
        section: string;
    };
}

export default borders