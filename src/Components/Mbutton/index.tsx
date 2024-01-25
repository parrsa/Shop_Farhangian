import React, { forwardRef } from "react";
import MButtonRoot from "./MButtonRoot";
import PropTypes from "prop-types";
import { SxProps } from "@mui/material";

interface MButtonProps {
    common?: boolean;
    width?: string;
    color?: "white" | "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";
    variant?: "text" | "contained" | "outlined" | "gradient";
    size?: "small" | "medium" | "large";
    circular?: boolean;
    iconOnly?: boolean;
    border?: string;
    borderRadius?: string;
    positon?: string;
    marginTop?: string;
    bgColor?: any;
    login?: boolean;
    category?: boolean
    submit?: boolean;
    darkMode?: boolean;
    fullWidth?: boolean;
    children: React.ReactNode;
}

const MTButton = forwardRef<HTMLButtonElement, any>(
    (
        {
            width,
            color,
            variant,
            size,
            circular,
            iconOnly,
            border,
            borderRadius,
            bgColor,
            login,
            category,
            submit,
            common,
            darkMode,
            children,
            fullWidth,
            ...rest
        },
        ref
    ) => (
        <MButtonRoot
            {...rest}
            ref={ref}
            color="primary"
            variant={variant === "gradient" ? "contained" : variant}   
             style={{ direction: "rtl" }}
            size={size}
            ownerState={{
                common,
                width,
                color,
                submit,
                variant,
                size,
                circular,
                category,
                iconOnly,
                border,
                bgColor,
                borderRadius,
                login,
                darkMode,
                fullWidth,
                ...rest,
            }}
        >
            {children}
        </MButtonRoot>
    )
);



export default MTButton;











// import { forwardRef } from "react";
// import MInputRoot from "./MInputRoot";

// interface owner {
//     internShip?: boolean
//     fullWidth?: boolean,
//     helperText?: string
//     border?: string
//     error?: string
//     bgColor?: boolean
//     direction?: boolean
//     login?: string
//     value?: string
//     popup?: string
//     form?: boolean
//     fullHeight?: boolean
//     size?: "small" | "medium"
// }

// const MInput = forwardRef<HTMLInputElement, any>(
//     (
//         {
//             fullWidth,
//             fullHeight,
//             helperText,
//             border,
//             error,
//             bgColor,
//             direction,
//             login,
//             popup,
//             form,
//             internShip,
//             size,
//             height,
//             ...rest
//         },
//         ref
//     ) => (
//         <MInputRoot
//             {...rest}
//             ref={ref}
//             style={{ direction: "rtl" }}
//             size={!!form ? "small" : size}
//             variant={"outlined"}
//             helperText={helperText && helperText}
//             ownerState={{
//                 border,
//                 fullHeight,
//                 internShip,
//                 fullWidth,
//                 bgColor,
//                 popup,
//                 error,
//                 direction,
//                 height,
//                 login,
//                 form,
//                 ...rest
//             }}
//         />
//     )
// );
// export default MInput;
