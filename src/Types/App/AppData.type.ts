// this is a common interface for all sections in the app but we will extend it in other interfaces and add new properties to it

export interface CommonTextInterface {
    title?: string
    subTitle?: string
    caption?: string
    introCaptions?: string[]
    imgUrl?: string
    imgUrl1?: string
}


// interface for platforms section
interface platformInterface {
    englishName?: string
    perSianName?: string
    imageUrl?: string
}


export interface PlatformInformationInterface extends CommonTextInterface {
    platform: platformInterface []
}


interface ImageUrl {
    url?: string
}

export interface AbilitiesInterFace extends CommonTextInterface {
    images?: ImageUrl[]
}

export interface Property {
    category?: string,
    imgUrl?: string
    features?: string[]
}


export interface FeaturesInterface extends CommonTextInterface {
    kind1?:string,
    kind?:string,
    general?: Property []
    exclusive?: string []
}

// the form section interfaces
export interface inputInterFace {
    label?: string
    name?: string
    type?: string
}

export interface ContactUsInterface extends CommonTextInterface {
    form?: inputInterFace[],
    imgUrl?: string
    address?: string
    phoneNumber?: string
}

//the footer interfaces
export interface IconsInterface {
    // icon: IconProp,
    caption?: string,
    address?: string,
    link?: string
}

export interface FooterInterface {
    caption?: string
    icons?: IconsInterface[]
}
