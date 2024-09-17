export const randomInt = ({min, max}: { min: number, max: number }) =>
    Math.floor(Math.random() * (max - min + 1)) + min;