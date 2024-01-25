import hexToRgb from "./hexToRgb";

function rgba(color:string , opacity:number):string {
    return `rgba(${hexToRgb(color)},${opacity}`
}

export default rgba