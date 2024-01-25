function linearGradient(color: string | undefined, colorState: string | undefined, angle: number | undefined = 195): string {
    return `linear-gradient(${angle}deg,${color},${colorState})`
}

export default linearGradient;