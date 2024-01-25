import colors from "./colors";
import BoxShadow from "../functions/boxShadow";

const {black, white, tabs, coloredShadows} = colors;

const boxShadows = {
    xs: BoxShadow([0, 2], [9, -5], black.main, 0.15),
    sm: BoxShadow([0, 5], [10, 0], black.main, 0.12),
    md: `${BoxShadow([0, 4], [6, -1], black.main, 0.1)}, ${BoxShadow(
        [0, 2],
        [4, -1],
        black.main,
        0.06
    )}`,
    lg: `${BoxShadow([0, 10], [15, -3], black.main, 0.1)}, ${BoxShadow(
        [0, 4],
        [6, -2],
        black.main,
        0.05
    )}`,
    xl: `${BoxShadow([0, 20], [25, -5], black.main, 0.1)}, ${BoxShadow(
        [0, 10],
        [10, -5],
        black.main,
        0.04
    )}`,
    xxl: BoxShadow([0, 20], [27, 0], black.main, 0.05),
    inset: BoxShadow([0, 1], [2, 0], black.main, 0.075, "inset"),
    colored: {
        primary: `${BoxShadow([0, 4], [20, 0], black.main, 0.14)}, ${BoxShadow(
            [0, 7],
            [10, -5],
            coloredShadows.main,
            0.4
        )}`,
        secondary: `${BoxShadow([0, 4], [20, 0], black.main, 0.14)}, ${BoxShadow(
            [0, 7],
            [10, -5],
            coloredShadows.secondary,
            0.4
        )}`,
        info: `${BoxShadow([0, 4], [20, 0], black.main, 0.14)}, ${BoxShadow(
            [0, 7],
            [10, -5],
            coloredShadows.tertiary,
            0.4
        )}`,
        success: `${BoxShadow([0, 4], [20, 0], black.main, 0.14)}, ${BoxShadow(
            [0, 7],
            [10, -5],
            coloredShadows.Quaternary,
            0.4
        )}`,
        warning: `${BoxShadow([0, 4], [20, 0], black.main, 0.14)}, ${BoxShadow(
            [0, 7],
            [10, -5],
            coloredShadows.Quaternary,
            0.4
        )}`,
        error: `${BoxShadow([0, 4], [20, 0], black.main, 0.14)}, ${BoxShadow(
            [0, 7],
            [10, -5],
            coloredShadows.focus,
            0.4
        )}`,
        light: `${BoxShadow([0, 4], [20, 0], black.main, 0.14)}, ${BoxShadow(
            [0, 7],
            [10, -5],
            coloredShadows.light,
            0.4
        )}`,
        dark: `${BoxShadow([0, 4], [20, 0], black.main, 0.14)}, ${BoxShadow(
            [0, 7],
            [10, -5],
            coloredShadows.dark,
            0.4
        )}`,
    },

    navbarBoxShadow: `${BoxShadow([0, 0], [1, 1], white.main, 0.9, "inset")}, ${BoxShadow(
        [0, 20],
        [27, 0],
        black.main,
        0.05
    )}`,
    sliderBoxShadow: {
        thumb: BoxShadow([0, 1], [13, 0], black.main, 0.2),
    },
    tabsBoxShadow: {
        indicator: BoxShadow([0, 1], [5, 1], tabs.indicator?.main, 1),
    },
};

export interface boxShadowOptions {
    xs?: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
    xxl?: string
    inset?: string

    colored: {
        primary?: string
        secondary?: string
        info?: string
        success?: string
        warning?: string
        error?: string
        light?: string
        dark?: string
        navbarBoxShadow?:string
        sliderBoxShadow?:string
        tabsBoxShadow?:string
    }
}

export default boxShadows;