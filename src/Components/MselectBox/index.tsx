import { forwardRef } from "react";
// import MCardRoot from "./MCardRoot";
import MInputRoot from "./MSelectBoxRoot";


interface owner {
    internShip?: boolean
    fullWidth?: boolean,
    helperText?: string
    border?: string
    error?: string
    bgColor?: boolean
    direction?: boolean
    login?: string
    value?: string
    popup?: string
    form?: boolean
    fullHeight?: boolean
    size?: "small" | "medium"
}

const MSelectBox = forwardRef<HTMLInputElement, any>(
    (
        {
            fullWidth,
            fullHeight,
            helperText,
            border,
            error,
            bgColor,
            direction,
            login,
            value,
            popup,
            form,
            internShip,
            size,
            height,
            ...rest
        },
        ref
    ) => (
        <MInputRoot
            {...rest}
            ref={ref}
            style={{ direction: "rtl" }}
            size={!!form ? "small" : size}
            value={value}
            variant={"outlined"}
            helperText={helperText && helperText}
            ownerState={{
                border,
                fullHeight,
                internShip,
                fullWidth,
                bgColor,
                popup,
                error,
                direction,
                height,
                login,
                form,
                ...rest
            }}
        />
    )
);
export default MSelectBox;
