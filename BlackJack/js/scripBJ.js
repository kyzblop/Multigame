let jeuComplet = new Array(52)

jeuComplet = [
    "As_coeur", "2_coeur", "3_coeur", "4_coeur", "5_coeur", "6_coeur",
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
let nbCartes = 52;

let valeurMise = 100;

// Initialisation de la valeur du stack
// let valeurStack = parseInt(sessionStorage.getItem("stack"))
let valeurStack = 5000;
document.getElementById("stackValeur").innerText = valeurStack

// Gestion de la mise
document.getElementById("miseValeur").innerHTML = valeurMise

// Augmentation de la mise
document.getElementById("iconPlus").addEventListener("click", () => {
    if(valeurMise <= (valeurStack - 100)){
        valeurMise += 100
        document.getElementById("miseValeur").innerHTML = valeurMise
    }
})

// Diminution de la mise
document.getElementById("iconMoins").addEventListener("click", () => {
    if(valeurMise > 100){
        valeurMise -= 100
        document.getElementById("miseValeur").innerHTML = valeurMise
    }
})


// Gestion d'un tirage de carte
function tirerCarte() {
    // On tire un numéro aléatoire
    numCarte = Math.floor(Math.random() * nbCartes);

    // On tire la carte correspondante et on la supprime du paquet
    carte = jeu.at(numCarte)
    jeu.splice(numCarte, 1);
    nbCartes --;

    return carte;
}

// Gestion de la valeur des cartes
function valeur(carte) {
    let valCarte;

    // On recupère la valeur de la carte
    let index = carte.indexOf("_");
    let val = carte.slice(0, index);
    
    if(val == "As"){
        valCarte = 11;
    } else if(val == "10" || val == "J" || val == "Q" || val == "K"){
        valCarte = 10;
    } else {
        valCarte = val;
    }

    return valCarte;
}

// Gestion de la couleur de la carte
function couleur(carte) {
    let couleur;

    // on recupère la couleur de la carte
    let index = carte.indexOf("_");
    couleur = carte.slice(index+1 , carte.lenght)

    return couleur
}


// Quand on clique sur Jouer
document.getElementById("btnJouer").addEventListener("click", () =>{
    // On cache les premiers elements
    document.getElementById("faitesVosJeux").style.display = "none"
    document.getElementById("votreMise").style.display = "none"

    // On montre le jeu
    document.getElementById("mainCroupier").hidden = false;
    document.getElementById("votreMain").hidden = false;


    // Le joueur tire sa première carte
    setTimeout(function() {
        let carte1Joueur = tirerCarte()
        let valCart = valeur(carte1Joueur)
        let coulCart = couleur(carte1Joueur)

        console.log(carte1Joueur)
        console.log(coulCart)
        console.log(valCart)

        document.getElementById("cart1Joueur").setAttribute("src", `images/${coulCart}/${carte1Joueur}.jpg`)
        document.getElementById("cart1Joueur").setAttribute("alt", `img_${carte1Joueur}`)
    }, 500)

    // Le croupier tire sa première carte
    setTimeout(function() {
        let carte1Croupier = tirerCarte()
        let valCart = valeur(carte1Croupier)
        let coulCart = couleur(carte1Croupier)

        console.log(carte1Croupier)
        console.log(coulCart)
        console.log(valCart)

        document.getElementById("cart1Croupier").setAttribute("src", `images/${coulCart}/${carte1Croupier}.jpg`)
        document.getElementById("cart1Croupier").setAttribute("alt", `img_${carte1Croupier}`)
    }, 1000)

    // Le joueur tire sa seconde carte
    setTimeout(function() {
        let carte2Joueur = tirerCarte()
        let valCart = valeur(carte2Joueur)
        let coulCart = couleur(carte2Joueur)

        console.log(carte2Joueur)
        console.log(coulCart)
        console.log(valCart)

        document.getElementById("cart2Joueur").setAttribute("src", `images/${coulCart}/${carte2Joueur}.jpg`)
        document.getElementById("cart2Joueur").setAttribute("alt", `img_${carte2Joueur}`)
    }, 1500)

    // Le croupier tire sa seconde carte
    setTimeout(function() {
        let carte2Croupier = tirerCarte()
        let valCart = valeur(carte2Croupier)
        let coulCart = couleur(carte2Croupier)

        console.log(carte2Croupier)
        console.log(coulCart)
        console.log(valCart)

        document.getElementById("cart2Croupier").setAttribute("src", `images/${coulCart}/${carte2Croupier}.jpg`)
        document.getElementById("cart2Croupier").setAttribute("alt", `img_${carte2Croupier}`)
    }, 2000)
    
})


document.getElementById("btnCarte").addEventListener("click", () => {
    
    
})

document.getElementById("btnSplit").addEventListener("click", () => {

})