import convert from "color-convert";
/**
 * Génère une palette de couleurs HSL à partir d'une couleur hex.
 * @param {string} hex - La couleur hexadécimale d'entrée (#RRGGBB).
 * @param {number} interval - L'intervalle de luminosité (par défaut 10).
 * @returns {Array} - Un tableau contenant les couleurs HSL.
 */
export function generatePalette(hex, interval = 10){
    const[h, s, l] = convert.hex.hsl(hex);

const palette = [];
for(let lightness = 0; lightness<= 100; lightness += interval){
    palette.push([h, s, lightness])
}
return palette;

}

export function createGradient(palette){
    const hexColors = palette.map((hsl)=> `#${convert.hsl.hex(hsl)}`);
    return `linear-gardient(-45deg, ${hexColors.join(",")})`;

}

export function hslToCssShadow(hsl){
    const[h,s,l] =hsl;
    return `${h}deg ${s}% ${l}%`;
}