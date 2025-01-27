import { generatePalette } from "./utils";
import Color from "./modules/Color";
const form = document.getElementById("color-form");
const input = document.getElementById("hex-color");
const main = document.getElementById("color-container");


form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const hexColor =input.value.trim();
    const isValidHex = /^[0-9A-F]{6}$/i.test(hexColor);

    if(isValidHex){
        main.innerHTML="";
        const palette = generatePalette(hexColor, 10);
       displayColors(palette, hexColor);}else{
        alert(`${hexColor} is not a valid Hexadecimal color.`)
       }
}

) ;

function displayPalette(palette){
paletteContainer.innerHTML = "";
palette.forEach(([h,s,l])=>{
    const colorDiv = document.createElement("div");
    colorDiv.style.width = "50px";
    colorDiv.style.height = "50px";
    colorDiv.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
    colorDiv.style.border = "1px solid #ccc";
    paletteContainer.appendChild(colorDiv);
});

}
