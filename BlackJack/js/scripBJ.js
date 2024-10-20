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
let numCarte; // Numero de la carte dans le jeu
let carte; // Nom de la carte
let nbCartes = 52; // Nombre de cartes restante dans le jeu

let carteTiree; // Nom de la carte tirée
let valCart; // Valeur de la carte tirée
let coulCart; // Couleur de la carte tirée

let cumulJoueur = 0; // Cumul du joueur
let cumulCroupier = 0; // Cumul du croupier
let nbAsJoueur = 0; // Nombre d'as du joueur
let nbAsCroupier = 0; // Nombre d'as du croupier
let carte2Croupier; // Seconde carte du croupier (face cachée puis face recto)

let isJoueur; // Boolean pour savoir si c'est le tour du joueur
let isFin = false; // Boolean pour savoir si le jeu est terminé
let isBJPossible = true; // Boolean pour savoir si un BlakcJack est possible (si c'est avec les deux premières cartes)

let valeurMise = 100; // Valeur de la mise du joueur

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

// Fonction pour attendre (à utiliser dans une fonction async)
function attendre(ms) {
    return new Promise(resolu => setTimeout(resolu, ms))
}

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

// Gestion d'un tirage de carte avec valeur et couleur selon joueur et croupier
function jouerCarte(isJoueur) {
    if(isJoueur==true){
        carteTiree = tirerCarte()
        valCart = valeur(carteTiree)
        if(valCart==11){
            nbAsJoueur ++;
        }
        coulCart = couleur(carteTiree)

        document.getElementById("cartesJoueur").innerHTML += `
            <img class="imageCarte" src="images/${coulCart}/${carteTiree}.jpg" alt="img_${carteTiree}">
        `

        cumulJoueur += parseInt(valeur(carteTiree))

        // Gestion des As
        if(cumulJoueur>21 && nbAsJoueur > 0){
            cumulJoueur = cumulJoueur - 10
            nbAsJoueur --;
            console.log("ici")
        }

        // Affichage du cumul du joueur
        document.getElementById("cumulJoueur").innerText = cumulJoueur;
        document.getElementById("messageCroupier").innerText = `Vous avez ${cumulJoueur}`


    } else {
        carteTiree = tirerCarte()
        valCart = valeur(carteTiree)
        if(valCart==11){
            nbAsCroupier ++;
        }
        coulCart = couleur(carteTiree)

        document.getElementById("cartesCroupier").innerHTML += `
            <img class="imageCarte" src="images/${coulCart}/${carteTiree}.jpg" alt="img_${carteTiree}">
        `
        cumulCroupier += parseInt(valeur(carteTiree))

        // Gestion des As
        if(cumulCroupier>21 && nbAsCroupier > 0){
            cumulCroupier = cumulCroupier - 10
            nbAsCroupier --;
        }

        // Affichage du cumul du croupier
        document.getElementById("messageCroupier").innerText = `J'ai ${cumulCroupier}`
    }
}

// Gestion des resultats à chaque carte tirée
function resultats() {

    if(isBJPossible==true){
        // Si un BlackJack a lieu, l'annoncer
        if(cumulCroupier == cumulJoueur == 21){
            // Message popup
            document.getElementById("egalite").style.display = "block"
            
            // Gestion du robot
            document.getElementById("teteCroupier").setAttribute("src", "/Multigame/Main/images/robot/robot_heureux.png")
            document.getElementById("messageCroupier").innerText = "Récupère ta mise !"

            // Gestion de la fin du jeu
            isFin = true;

            // Gestion de la mise
            valeurStack += valeurMise
            sessionStorage.setItem("stack", valeurStack)
            document.getElementById("stackValeur").innerText = valeurStack

        } else if(cumulJoueur == 21){
            // Message popup
            document.getElementById("victoire").style.display = "block"
            document.getElementById("victoireText").innerText = "BlackJack !"
            
            // Gestion du robot
            document.getElementById("teteCroupier").setAttribute("src", "/Multigame/Main/images/robot/robot_croix.png")
            document.getElementById("messageCroupier").innerText = "La chance !"

            // Gestion de la fin du jeu
            isFin = true;

            // Gestion de la mise
            valeurStack += valeurMise*2.5
            sessionStorage.setItem("stack", valeurStack)
            document.getElementById("stackValeur").innerText = valeurStack

        } else if(cumulCroupier == 21){
            // Message popup
            document.getElementById("defaite").style.display = "block"
            document.getElementById("defaiteText").innerText = "Le croupier a Blackjack !"

            // Gestion du robot
            document.getElementById("teteCroupier").setAttribute("src", "/Multigame/Main/images/robot/robot_moqueur.png")
            document.getElementById("messageCroupier").innerText = "Par ici la monnaie !"

            // Gestion de la fin du jeu
            isFin = true;
        }
    }
    

    // Si un bust à lieu, l'annoncer
    if(cumulJoueur > 21){
        // Message popup
        document.getElementById("defaite").style.display = "block"
        document.getElementById("defaiteText").innerText = "Vous avez busté !"

        // Gestion du robot
        document.getElementById("teteCroupier").setAttribute("src", "/Multigame/Main/images/robot/robot_moqueur.png")
        document.getElementById("messageCroupier").innerText = "Nulos !"

        // Gestion de la fin du jeu
        isFin = true;

    } else if(cumulCroupier > 21){
        // Message popup
        document.getElementById("victoire").style.display = "block"
        document.getElementById("victoireText").innerText = "Le croupier a busté !"

        // Gestion du robot
        document.getElementById("teteCroupier").setAttribute("src", "/Multigame/Main/images/robot/robot_enerve.png")
        document.getElementById("messageCroupier").innerText = "Trop nul ce jeu"

        // Gestion de la fin du jeu
        isFin = true;

        // Gestion de la mise
        valeurStack += valeurMise*2
        sessionStorage.setItem("stack", valeurStack)
        document.getElementById("stackValeur").innerText = valeurStack
    }
}

async function jeuCroupier() {
    // Le croupier retourne sa carte
    coulCart = couleur(carte2Croupier)
    document.getElementById("carte2Croupier").setAttribute("src", `images/${coulCart}/${carte2Croupier}.jpg`)
    document.getElementById("carte2Croupier").setAttribute("alt", `img_${carte2Croupier}`)
    
    // Affichage du cumul du croupier
    document.getElementById("messageCroupier").innerText = `J'ai ${cumulCroupier}`

    // Le croupier pioche ses cartes
    while(cumulCroupier<17){
        await attendre(1000)
        jouerCarte(false)
        resultats()
    }

    await attendre(1000)
    // Resultats finaux si pas de bust ni BlackJack
    if(isFin == false){
        if(cumulJoueur > cumulCroupier){
            // Message popup
            document.getElementById("victoire").style.display = "block"
            document.getElementById("victoireText").innerText = "Vous avez gagné !"
    
            // Gestion du robot
            document.getElementById("teteCroupier").setAttribute("src", "/Multigame/Main/images/robot/robot_triste.png")
            document.getElementById("messageCroupier").innerText = "J'ai jamais de chance"

            // Gestion de la mise
            valeurStack += valeurMise*2
            sessionStorage.setItem("stack", valeurStack)
            document.getElementById("stackValeur").innerText = valeurStack

        } else if(cumulJoueur < cumulCroupier){
            // Message popup
            document.getElementById("defaite").style.display = "block"
            document.getElementById("defaiteText").innerText = "Vous avez perdu !"
    
            // Gestion du robot
            document.getElementById("teteCroupier").setAttribute("src", "/Multigame/Main/images/robot/robot_heureux.png")
            document.getElementById("messageCroupier").innerText = "C'est pas de chance"
        } else{
            // Message popup
            document.getElementById("egalite").style.display = "block"
            
            // Gestion du robot
            document.getElementById("teteCroupier").setAttribute("src", "/Multigame/Main/images/robot/robot_heureux.png")
            document.getElementById("messageCroupier").innerText = "Récupère ta mise !"

            // Gestion de la mise
            valeurStack += valeurMise
            sessionStorage.setItem("stack", valeurStack)
            document.getElementById("stackValeur").innerText = valeurStack
        }
    }
    

}


// Quand on clique sur Jouer
document.getElementById("btnJouer").addEventListener("click", () =>{
    // La mise est retirée de notre stack
    valeurStack -=  valeurMise
    sessionStorage.setItem("stack", valeurStack)
    document.getElementById("stackValeur").innerText = valeurStack

    // On cache les premiers elements
    document.getElementById("faitesVosJeux").style.display = "none"
    document.getElementById("votreMise").style.display = "none"

    // On montre le jeu
    document.getElementById("mainCroupier").hidden = false;
    document.getElementById("votreMain").hidden = false;
    document.getElementById("croupier").style.display = "flex";
    document.getElementById("sabot").style.display = "flex";

    // Le joueur tire sa première carte
    setTimeout(function() {
        jouerCarte(true)
    }, 1000)

    // Le croupier tire sa première carte
    setTimeout(function() {
        jouerCarte(false)
    }, 2000)

    // Le joueur tire sa seconde carte
    setTimeout(function() {
        jouerCarte(true)
    }, 3000)

    // Le croupier tire sa seconde carte sans la montrer
    setTimeout(function() {
        carteTiree = tirerCarte()
        carte2Croupier = carteTiree;
        valCart = valeur(carte2Croupier)
        if(valCart==11){
            nbAsCroupier ++;
        }
        coulCart = couleur(carte2Croupier)

        document.getElementById("cartesCroupier").innerHTML += `
            <img id="carte2Croupier" class="imageCarte" src="images/dos_carte.png" alt="img_dos_carte">
        `
        cumulCroupier += parseInt(valeur(carte2Croupier))

        // Gestion des As
        if(cumulCroupier>21 && nbAsCroupier > 0){
            cumulCroupier = cumulCroupier - 10
            nbAsCroupier --;
        }

    }, 4000)

    setTimeout(function() {
        // Retourner la carte du croupier si necessaire
        if(cumulCroupier==21){
            coulCart = couleur(carte2Croupier)
            document.getElementById("carte2Croupier").setAttribute("src", `images/${coulCart}/${carte2Croupier}.jpg`)
            document.getElementById("carte2Croupier").setAttribute("alt", `img_${carte2Croupier}`)
        }

        // Afficher le resultat
        resultats()

        // Afficher les boutons de choix
        document.getElementById("boutons").hidden = false;

        // Affichage de la mise du joueur
        document.getElementById("miseJoueur").innerText = valeurMise;
        document.getElementById("miseJoueur").innerHTML += `
            <img class="iconJeton" src="/Multigame/Main/images/jeton_poker.JPG" alt="img_jeton_poker"></img>`

        // Un BlackJack n'est plus possible
        isBJPossible = false;
    }, 5000)
    
})

document.getElementById("btnCarte").addEventListener("click", () => {
    // Le joueur tire une carte
    jouerCarte(true)
    resultats()

    // Si on obtient 21, le jeu du croupier se lance directement
    if(cumulJoueur==21){
        // On cache les boutons
        document.getElementById("boutons").hidden = true;
        
        jeuCroupier()
    }
})

document.getElementById("btnRester").addEventListener("click", () => {
    // On cache les boutons
    document.getElementById("boutons").hidden = true;

    // Le croupier joue
    jeuCroupier()
})

document.getElementById("btnDoubler").addEventListener("click", () => {
    // Le joueur tire une carte
    jouerCarte(true)
    resultats()

    // Une mise est retirée de notre stack
    valeurStack -=  valeurMise
    sessionStorage.setItem("stack", valeurStack)
    document.getElementById("stackValeur").innerText = valeurStack

    // La valeur de la mise est doublée
    valeurMise = valeurMise*2
    document.getElementById("miseJoueur").innerText = valeurMise;
    document.getElementById("miseJoueur").innerHTML += `
        <img class="iconJeton" src="/Multigame/Main/images/jeton_poker.JPG" alt="img_jeton_poker"></img>`

    // Le jeu du croupier se lance directement
    jeuCroupier()
})

// Quitter les écrans de victoire, defaite et egalite
document.getElementById("victoire").addEventListener("click", () => {
    document.getElementById("victoire").style.display = "none";
    window.location.reload()
})

document.getElementById("defaite").addEventListener("click", () => {
    document.getElementById("defaite").style.display = "none";
    window.location.reload()
})

document.getElementById("egalite").addEventListener("click", () => {
    document.getElementById("egalite").style.display = "none";
    window.location.reload()
})