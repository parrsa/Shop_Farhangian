const breakpoints:breakPointOptions = {
    values: {
        xs: 0,
        xxs: 288,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1400,
        custom: 2520
    },
};

export interface breakPointOptions{
    values:{
        xs : number
        xxs : number
        sm : number
        md : number
        lg : number
        xl : number
        xxl : number
        custom:number
    }
}

export default breakpoints;