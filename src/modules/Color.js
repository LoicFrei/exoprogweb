import convert from"color-convert";
export default class Color{
    #hsl;
    #hex;
    #element;
    constructor(hsl){
        this.#hsl = hsl;
        this.#hex  = `#${convert.hsl.hex(hsl)}`;
        this.#generateElement();


    }
    #generateElement(){
        const [h, s, l] = this.#hsl;
        const textColor = l<60 ?"#ffffff" : "#000000";
        const div = document.createElement("div");
        div.className = "color";
        div.setAttribute("data-color", this.#hex);
        div.style.backgroundColor = this.#hex;
        const p = document.createElement("p");
        p.textContent = this.#hex;
        p.style.color  =textColor;
        div.appendChild(p);
        this.#element = div;
    }
    display(parentElement){
        if(parentElement){
            parentElement.appendChild(this.#element);
        }
    }
}