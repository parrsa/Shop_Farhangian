import { forwardRef } from "react";
import MInputRoot from "./MInputRoot";

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

const MInput = forwardRef<HTMLInputElement, any>(
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
export default MInput;
