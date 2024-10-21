let jeuComplet = new Map(number, String)

jeuComplet = [
    , "3_coeur", "4_coeur", "5_coeur", "6_coeur",
        "7_coeur", "8_coeur", "9_coeur", "10_coeur", "J_coeur",  "Q_coeur", "K_coeur",
    "As_carreau", "2_carreau", "3_carreau", "4_carreau", "5_carreau", "6_carreau",
        "7_carreau", "8_carreau", "9_carreau", "10_carreau", "J_carreau",  "Q_carreau", "K_carreau",
    "As_trefle", "2_trefle", "3_trefle", "4_trefle", "5_trefle", "6_trefle",
        "7_trefle", "8_trefle", "9_trefle", "10_trefle", "J_trefle",  "Q_trefle", "K_trefle",
    "As_pique", "2_pique", "3_pique", "4_pique", "5_pique", "6_pique",
        "7_pique", "8_pique", "9_pique", "10_pique", "J_pique",  "Q_pique", "K_pique"
];

let jeu = jeuComplet;
let numCarte;
let carte;

document.addEventListener("click", () => {
    numCarte = Math.floor(Math.random() * 53);

    carte = jeu.at(numCarte)
    console.log(carte)

    
})


