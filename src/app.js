import { generatePalette, hslToCssShadow, createGradient } from "./utils";
import Color from "./modules/Color";
import convert from "color-convert";
import { Notyf } from "notyf";
import 'notyf/notyf.min.css';
/**
 * Met à jour le fond du body et l'ombre du container.
 * @param {Array} palette - Tableau de triplets HSL.
 * @param {string} hexColor - Couleur hexadécimale entrée par l'utilisateur.
 */
const notyf = new Notyf({
    duration: 3000,
    position:{
        x:'right',
        y:'top',
    },
    types:[
        {
            type: 'success',
            background: 'green',
            icon: false,
        },
        {
            type: 'error',
            background: 'red',
            icon: false,
        }
    ]
});

function updateBackgroundAndShadow(palette, hexColor) {
  const body = document.body;
  const root = document.documentElement;

  // Créer et appliquer le dégradé
  const gradient = createGradient(palette);
  body.style.background = gradient;
  body.style.backgroundSize = "400% 400%";

  // Transformer la couleur hex en HSL
  const hsl = convert.hex.hsl(hexColor);

  // Transformer HSL en chaîne CSS et appliquer à l'ombre
  const shadowColor = hslToCssShadow(hsl);
  root.style.setProperty("--shadow-color", shadowColor);
}

/**
 * Affiche les couleurs dans le DOM et met à jour l'interface.
 * @param {Array} palette - Tableau de triplets HSL.
 * @param {string} hexColor - Couleur hexadécimale entrée par l'utilisateur.
 */
function displayColors(palette, hexColor) {
  const main = document.getElementById("color-container");
  const header = document.getElementById("app-header");

  if (!main || !header) {
    console.error('Element with ID "color-container" or "app-header" not found');
    return;
  }

  // Ajouter la classe 'minimized' à <header>
  header.classList.add("minimized");

  // Réinitialiser le contenu de <main>
  main.innerHTML = "";

  // Créer une instance Color pour chaque couleur de la palette
  palette.forEach((hsl) => {
    const colorInstance = new Color(hsl);
    colorInstance.display(main);
  });

  // Mettre à jour le fond et l'ombre
  updateBackgroundAndShadow(palette, hexColor);
}

// Gestionnaire principal
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("color-form");
  const input = document.getElementById("hex-color");
const main = document.getElementById("color-container");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const hexColor = input.value.trim();
    const isValidHex = /^#[0-9A-F]{6}$/i.test(hexColor);

    if (isValidHex) {
      // Générer une palette à partir de la couleur hexadécimale
      const palette = generatePalette(hexColor, 10);

      // Afficher les couleurs dans le DOM
      displayColors(palette, hexColor);
    } else {
      alert(`${hexColor} is not a valid Hexadecimal color.`);
    }
  });

  main.addEventListener("click", (event)=> {
    const clickedElement = event.target.closet(".color");
    if(clickedElement){
        const hexColor = clickedElement.getAttribute("data-color");
        if(hexColor){
            navigator.clipboard.writeText(hexColor)
            .then(()=>{
                notyf.success(`Copied ${hexColor} to clipboard`);

            }).catch((err)=>{
                console.error("Erreur lors de la copie dans le presse papier :", err);
             notyf.error("Failed to copy to clipboard.")
            })
        }
    }
  })
});
