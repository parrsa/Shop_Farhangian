import chroma from "chroma-js";
function hexToRgb(color:string):string{
    return chroma(color).rgb().join(",")
}

export default hexToRgb;