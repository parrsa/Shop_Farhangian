function pxToRem(number: number, baseNumber: number = 16): string {
    return `${number / baseNumber} rem`
}

export default pxToRem;