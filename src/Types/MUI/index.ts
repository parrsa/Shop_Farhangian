import {BorderOptions} from "../../Assets/theme/base/borders";
import {boxShadowOptions} from "../../Assets/theme/base/boxShadows";

interface IFunctions {
    hexToRgb: (color: string) => string;
    BoxShadow: (offset: number[], radius: [number, number], color: string | undefined, opacity: number, inset?: string) => string;
    rgba: (color: string, opacity: number) => string;
    linearGradient: (color: string | undefined, colorState: string | undefined, angle: number | undefined) => string;
    gradientChartLine: (chart: HTMLCanvasElement, color: string, opacity: number) => CanvasGradient;
    pxToRem: (number: number) => string

}


declare module '@mui/material/styles' {

    interface Theme {
        border: BorderOptions
        boxShadow: boxShadowOptions
        functions: IFunctions
    }

    interface ThemeOptions {
        border: BorderOptions
        boxShadow: boxShadowOptions
        functions: IFunctions

    }

    interface Palette {
        socialMedias: socialColors
        gradients: gradientsColors
        red: SimplePaletteColorOptions
        pink: SimplePaletteColorOptions
        purple: SimplePaletteColorOptions
        deepPurple: SimplePaletteColorOptions
        indigo: SimplePaletteColorOptions
        blue: SimplePaletteColorOptions
        lightBlue: SimplePaletteColorOptions
        cyan: SimplePaletteColorOptions
        teal: SimplePaletteColorOptions
        green: SimplePaletteColorOptions
        lightGreen: SimplePaletteColorOptions
        lime: SimplePaletteColorOptions
        yellow: SimplePaletteColorOptions
        amber: SimplePaletteColorOptions
        orange: SimplePaletteColorOptions
        deepOrange: SimplePaletteColorOptions
        brown: SimplePaletteColorOptions
        blueGrey: SimplePaletteColorOptions
        badgeColors: BadgeColors
        white: PaletteColorOptions
        transparent: PaletteColorOptions
        light: PaletteColorOptions
        black: PaletteColorOptions
        dark: PaletteColorOptions
        inputBorderColor: PaletteColorOptions
        coloredShadows: PaletteColorOptions
        tabs: PaletteColor
        farhangian:PaletteFarhangian

    }

    interface PaletteOptions {
        PaletteOptions:socialColorOptions
        socialMedias: socialColors
        gradients: gradientsColors
        red: SimplePaletteColorOptions
        pink: SimplePaletteColorOptions
        purple: SimplePaletteColorOptions
        deepPurple: SimplePaletteColorOptions
        indigo: SimplePaletteColorOptions
        blue: SimplePaletteColorOptions
        lightBlue: SimplePaletteColorOptions
        cyan: SimplePaletteColorOptions
        teal: SimplePaletteColorOptions
        green: SimplePaletteColorOptions
        lightGreen: SimplePaletteColorOptions
        lime: SimplePaletteColorOptions
        yellow: SimplePaletteColorOptions
        amber: SimplePaletteColorOptions
        orange: SimplePaletteColorOptions
        deepOrange: SimplePaletteColorOptions
        brown: SimplePaletteColorOptions
        blueGrey: SimplePaletteColorOptions
        badgeColors: BadgeColors
        farhangian:PaletteFarhangian
        white: PaletteColorOptions
        transparent: PaletteColorOptions
        light: PaletteColorOptions
        black: PaletteColorOptions
        dark: PaletteColorOptions
        inputBorderColor: PaletteColorOptions
        coloredShadows: PaletteColorOptions
        tabs: PaletteColor
    }
    interface PaletteFarhangian {
        main: string,
        blue:string,
        yellow:string,
        gray:string

    }
    // SocialColors

    interface socialColors {
        facebook: socialColorOptions
        twitter: socialColorOptions
        instagram: socialColorOptions
        linkedin: socialColorOptions
        pinterest: socialColorOptions
        youtube: socialColorOptions
        vimeo: socialColorOptions
        slack: socialColorOptions
        dribbble: socialColorOptions
        github: socialColorOptions
        reddit: socialColorOptions
        tumblr: socialColorOptions
        GooglePlus: socialColorOptions
        Steam: socialColorOptions
        Soundcloud: socialColorOptions
        Yahoo: socialColorOptions
        Amazon: socialColorOptions
        Spotify: socialColorOptions
        Discord: socialColorOptions
        Twitch: socialColorOptions
        WhatsApp: socialColorOptions
        Snapchat: socialColorOptions
        Pinterest: socialColorOptions
        TikTok: socialColorOptions
        Skype: socialColorOptions

    }

    interface socialColorOptions {
        main: string
        dark?: string
    }


    // GradientsColors

    interface gradientsColors {
        primary: gradientsColorsOptions
        secondary: gradientsColorsOptions
        info: gradientsColorsOptions
        success: gradientsColorsOptions
        warning: gradientsColorsOptions
        error: gradientsColorsOptions
        light: gradientsColorsOptions
        dark: gradientsColorsOptions
        Grade_Grey: gradientsColorsOptions
        Piggy_Pink: gradientsColorsOptions
        Cool_Blues: gradientsColorsOptions
        Mega_Tron: gradientsColorsOptions
        Moonlit_Asteroid: gradientsColorsOptions

    }


    interface gradientsColorsOptions {
        main: string
        state: string
        state1?: string
    }

    interface PaletteColorOptions {
        main: string
        state?: string
        focus?: string
        light?: string
        dark?: string
        primary?: string
        secondary?: string
        tertiary?: string
        Quaternary?: string
    }


    // SimpleColors
    interface SimplePaletteColorOptions {
        main: string
        50?: string
        60?: string
        100?: string
        200?: string
        300?: string
        400?: string
        450?: string
        500?: string
        600?: string
        700?: string
        800?: string
        900?: string
        A100?: string
        A200?: string
        A300?: string
        A400?: string
        A500?:string
        A600?:string
        A700?: string
        A750?: string
        A800?:string
        A900?:string
        fucos?: string;
    }

    //BadgeColors
    interface BadgeColors {
        primary: BadgeColorsOptions
        secondary: BadgeColorsOptions
        info: BadgeColorsOptions
        success: BadgeColorsOptions
        warning: BadgeColorsOptions
        error: BadgeColorsOptions
        light: BadgeColorsOptions
        dark: BadgeColorsOptions
    }

    interface BadgeColorsOptions {
        background: string
        text: string
    }

    interface PaletteColor {
        indicator: PaletteColorOptions
    }

}


