import pxToRem from "./pxToRem";
import rgba from "./rgba";

function BoxShadow(offset: number[] = [], raduis: number[] = [], color: string | undefined, opacity: number, inset: string =""): string {
    const [x, y] = offset
    const [blur, spread] = raduis
    return `${inset} ${pxToRem(x)} ${pxToRem(y)} ${pxToRem(blur)} ${pxToRem(spread)} ${rgba(
        color ?? "#fff",
        opacity
    )}`;
}

export default BoxShadow;