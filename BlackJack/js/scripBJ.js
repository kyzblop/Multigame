let jeu = new Array(52)

jeu = [
    "As_coeur", "2_coeur", "3_coeur", "4_coeur", "5_coeur", "6_coeur",
        "7_coeur", "8_coeur", "9_coeur", "10_coeur", "J_coeur",  "Q_coeur", "K_coeur",
    "As_carreau", "2_carreau", "3_carreau", "4_carreau", "5_carreau", "6_carreau",
        "7_carreau", "8_carreau", "9_carreau", "10_carreau", "J_carreau",  "Q_carreau", "K_carreau",
    "As_trefle", "2_trefle", "3_trefle", "4_trefle", "5_trefle", "6_trefle",
        "7_trefle", "8_trefle", "9_trefle", "10_trefle", "J_trefle",  "Q_trefle", "K_trefle",
    "As_pique", "2_pique", "3_pique", "4_pique", "5_pique", "6_pique",
        "7_pique", "8_pique", "9_pique", "10_pique", "J_pique",  "Q_pique", "K_pique"
];

let numCarte; // Numero de la carte dans le jeu
let carte; // Nom de la carte
let nbCartes = 52; // Nombre de cartes restante dans le jeu

let carteTiree; // Nom de la carte tirée
let valCart; // Valeur de la carte tirée
let coulCart; // Couleur de la carte tirée

let cumulJoueur = [4] // Cumul du joueur
cumulJoueur[0] = 0;
let cumulCroupier = 0; // Cumul du croupier
let nbAsJoueur = [4] // Nombre d'as du joueur
nbAsJoueur[0] = 0;
let nbAsCroupier = 0; // Nombre d'as du croupier
let carte2Croupier; // Seconde carte du croupier (face cachée puis face recto)

let isJoueur; // Boolean pour savoir si c'est le tour du joueur
let isFin = false; // Boolean pour savoir si le jeu est terminé
let isBJPossible = true; // Boolean pour savoir si un BlakcJack est possible (si c'est avec les deux premières cartes)

let mainEnCours = 1 // Compteur de la main en cours
let carteEnCours = 0; // Compteur de la carte en cours dans la main concernée
let nbMainsTotal = 1; // Compteur de nombre de mains total

let nbMainTotal=1; // Compteur de main
let derniereMain; // Numero de la dernière main (avant split)

let mainTermine = new Array()

let isDouble = false; // Boolean pour savoir si on est dans la fonction doubler

let cart1; // Carte pour comparaison
let cart2; // Carte pour comparaison

let gain = 0; // Valeur du gain

let valeurMise = 100; // Valeur de la mise du joueur

// Initialisation de la valeur du stack
let valeurStack = parseInt(sessionStorage.getItem("stack"))
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

    // On recupère la couleur de la carte
    let index = carte.indexOf("_");
    couleur = carte.slice(index+1 , carte.lenght)

    return couleur
}

function symbole(carte) {
    let symbole;

    // On recupère le symbole de la carte
    let index = carte.indexOf("_");
    symbole = carte.slice(0, index)

    return symbole
}

// Gestion d'un tirage de carte avec valeur et couleur selon joueur et croupier
function jouerCarte(isJoueur) {
    if(isJoueur==true){
        carteTiree = tirerCarte()
        carteEnCours++; // Incrémentation de la carte en cours

        valCart = valeur(carteTiree)
        if(valCart==11){
            nbAsJoueur[mainEnCours-1] ++;
        }
        coulCart = couleur(carteTiree)


        document.getElementById(`cartesJoueur${mainEnCours}`).innerHTML += `
            <img id="main${mainEnCours}Carte${carteEnCours}" 
            class="imageCarte" 
            src="images/${coulCart}/${carteTiree}.JPG" alt="img_${carteTiree}" 
            name="${carteTiree}"> 
        `

        cumulJoueur[mainEnCours-1] += parseInt(valeur(carteTiree))

        // Gestion des As
        if(cumulJoueur[mainEnCours-1]>21 && nbAsJoueur[mainEnCours-1] > 0){
            cumulJoueur[mainEnCours-1] = cumulJoueur[mainEnCours-1] - 10
            nbAsJoueur[mainEnCours-1] --;
        }

        // Affichage du cumul du joueur
        document.getElementById(`cumulJoueur${mainEnCours}`).innerText = cumulJoueur[mainEnCours-1]
        document.getElementById("messageCroupier").innerText = `Vous avez ${cumulJoueur[mainEnCours-1]}`


    } else {
        carteTiree = tirerCarte()
        valCart = valeur(carteTiree)
        if(valCart==11){
            nbAsCroupier ++;
        }
        coulCart = couleur(carteTiree)

        document.getElementById("cartesCroupier").innerHTML += `
            <img class="imageCarte" src="images/${coulCart}/${carteTiree}.JPG" alt="img_${carteTiree}">
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
        if(cumulJoueur[mainEnCours-1] == 21 && (cumulCroupier != 21)){
            document.getElementById("messageCroupier").innerText = "BlackJack !"
            document.getElementById("result").style.display = "block"
            gain = 2.5*valeurMise
            document.getElementById("resultText").innerText = `Vous avez gagné ${gain} jetons !`

            // Mise à jour du stack
            valeurStack += gain
            sessionStorage.setItem("stack", valeurStack)
            document.getElementById("stackValeur").innerText = valeurStack

            isFin = true
        } else if(cumulCroupier == 21 && (cumulJoueur[mainEnCours-1] != 21)) {
            document.getElementById("messageCroupier").innerText = "J'ai gagné !"
            rester()
        } else if(cumulCroupier == cumulJoueur[mainEnCours-1] && cumulCroupier == 21){
            document.getElementById("messageCroupier").innerText = "Reprends ta mise !"
            rester()
        }
    }

    // Si un bust à lieu, l'annoncer
    if(cumulJoueur[mainEnCours-1] > 21){
        document.getElementById("messageCroupier").innerText = "Nulos !"
        // Si on est dans le cas d'un doubler, il ne faut pas passer la main car c'est déjà géré par la fonction doubler
        if(isDouble==false){
            isFin = true
            rester()
        }

    } else if(cumulCroupier > 21){
        document.getElementById("messageCroupier").innerText = "Trop nul ce jeu"
        isFin = true
    }
}

async function jeuCroupier() {
    // Si pas de bust ni BlackJack
    if(isFin == false){
        // Le croupier retourne sa carte
        coulCart = couleur(carte2Croupier)
        document.getElementById("carte2Croupier").setAttribute("src", `images/${coulCart}/${carte2Croupier}.JPG`)
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

        // Calcul du gain
        for(i=0; i<nbMainTotal; i++){
            if(cumulJoueur[i] > cumulCroupier && cumulJoueur[i] <= 21){
                let miseEnCours = parseInt(document.getElementById(`miseJoueur${i+1}`).getAttribute("valeur"))
                gain += 2*miseEnCours
            } else if(cumulJoueur[i] == cumulCroupier){
                let miseEnCours = parseInt(document.getElementById(`miseJoueur${i+1}`).getAttribute("valeur"))
                gain += miseEnCours
            } else if(cumulJoueur[i] <= 21 && cumulCroupier>21){
                let miseEnCours = parseInt(document.getElementById(`miseJoueur${i+1}`).getAttribute("valeur"))
                gain += 2*miseEnCours
            }
        }
    }

    // Message popup
    document.getElementById("result").style.display = "block"
    if(gain > 0) {
        document.getElementById("resultText").innerText = `Vous avez gagné ${gain} jetons !`

        // Mise à jour du stack
        valeurStack += gain
        sessionStorage.setItem("stack", valeurStack)
        document.getElementById("stackValeur").innerText = valeurStack
    } else if(gain < 0) {
        document.getElementById("resultText").innerText = `Vous avez perdu ${Math.abs(gain)} jetons !`

        console.log(gain)
        // Mise à jour du stack
        valeurStack += gain
        sessionStorage.setItem("stack", valeurStack)
        document.getElementById("stackValeur").innerText = valeurStack
    } else {
        document.getElementById("resultText").innerText = `Stand off !`
    }

    
}

function rester() {

    if(mainEnCours>1){

        mainTermine.push(mainEnCours)
        mainEnCours--;
        carteEnCours =1;
        while(mainTermine.includes(mainEnCours)){
            mainEnCours--;
        }

        // La main en cours est mise en évidence
        document.getElementById(`cartesJoueur1`).style = "bow-shadow : none"
        document.getElementById(`cartesJoueur2`).style = "bow-shadow : none"
        document.getElementById(`cartesJoueur3`).style = "bow-shadow : none"
        document.getElementById(`cartesJoueur4`).style = "bow-shadow : none"
        document.getElementById(`cartesJoueur${mainEnCours}`).style = "box-shadow : 0px 0px 10px white"

        jouerCarte(true)

        cart1 = document.getElementById(`main${mainEnCours}Carte${carteEnCours}`).getAttribute("name")
        cart2 = document.getElementById(`main${mainEnCours}Carte${carteEnCours-1}`).getAttribute("name")

        // Si les valeurs sont identiques, le bouton Split est montré, sinon il est caché
        if(symbole(cart1) != symbole(cart2)){
            document.getElementById("btnSplit").style.display = "none"
        } else {
            document.getElementById("btnSplit").style.display = "flex"
        }
    } else {

        // On cache les boutons
        document.getElementById("boutons").style.display = "none"

        // Le croupier joue
        jeuCroupier()
    }
}






// Quand on clique sur Jouer
document.getElementById("btnJouer").addEventListener("click", () =>{
    // Le gain est la valeur negative de la mise 
    gain -= valeurMise;

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
            document.getElementById("carte2Croupier").setAttribute("src", `images/${coulCart}/${carte2Croupier}.JPG`)
            document.getElementById("carte2Croupier").setAttribute("alt", `img_${carte2Croupier}`)
        }

        // Afficher le resultat
        resultats()

        // Afficher les boutons de choix
        document.getElementById("boutons").style.display = "flex";

        // Affichage de la mise du joueur
        document.getElementById(`miseJoueur${mainEnCours}`).innerText = valeurMise;
        document.getElementById(`miseJoueur${mainEnCours}`).setAttribute("valeur", valeurMise)
        document.getElementById(`miseJoueur${mainEnCours}`).innerHTML += `
            <img class="iconJeton" src="/Multigame/Main/images/jeton_poker.JPG" alt="img_jeton_poker"></img>`

        // Un BlackJack n'est plus possible
        isBJPossible = false;

        // Si les symboles des deux cartes du joueur sont identiques, le bouton Split apparait
        cart1 = document.getElementById(`main${mainEnCours}Carte${carteEnCours-1}`).getAttribute("name")
        cart2 = document.getElementById(`main${mainEnCours}Carte${carteEnCours}`).getAttribute("name")
        
        if(symbole(cart1) == symbole(cart2)){
            document.getElementById("btnSplit").style.display = "flex";
        }
        
    }, 5000)
    
})

document.getElementById("btnCarte").addEventListener("click", () => {
    // Le joueur tire une carte
    jouerCarte(true)
    resultats()

    // Si on obtient 21, le jeu passe à la main suivante ou en croupier
    if(cumulJoueur[mainEnCours-1]==21){
        rester()
    }
})

document.getElementById("btnRester").addEventListener("click", () => {
    rester()
})

document.getElementById("btnDoubler").addEventListener("click", () => {
    isDouble = true;
    // Le joueur tire une carte
    jouerCarte(true)
    resultats()

    // Le gain est géré en fonction
    gain -= valeurMise;

    // La valeur de la mise est doublée
    console.log(mainEnCours)
    document.getElementById(`miseJoueur${mainEnCours}`).innerText = 2*valeurMise;
    document.getElementById(`miseJoueur${mainEnCours}`).setAttribute("valeur", 2*valeurMise)
    document.getElementById(`miseJoueur${mainEnCours}`).innerHTML += `
        <img class="iconJeton" src="/Multigame/Main/images/jeton_poker.JPG" alt="img_jeton_poker"></img>
    `

    // Le jeu passe à la main suivante
    rester()

    isDouble = false;
})

document.getElementById("btnSplit").addEventListener("click", () =>{

    // Le compteur de main est incrémenté, celui des cartes est réinitialisé
    derniereMain = mainEnCours;
    mainEnCours++;
    
    while(mainTermine.includes(mainEnCours)){
        mainEnCours++
    }
    carteEnCours = 1;
    nbMainTotal++;

    // La balise s'affiche 
    document.getElementById(`main${mainEnCours}`).style.display = "flex"

    // Transfère de la carte doublée sur la seconde main
    let carteDouble = document.getElementById(`main${derniereMain}Carte2`).getAttribute("name")
    document.getElementById(`main${derniereMain}Carte2`).remove()
    carteEnCours = 1;
    coulCart = couleur(carteDouble)
    document.getElementById(`cartesJoueur${mainEnCours}`).innerHTML = `
        <img id="main${mainEnCours}Carte${carteEnCours}" 
        class="imageCarte" src="images/${coulCart}/${carteDouble}.JPG" alt="img_${carteDouble}" 
        name="${carteDouble}">
    `

    // Le cumul des main est recalculé
    cumulJoueur[derniereMain-1] -= parseInt(valeur(carteDouble))
    document.getElementById(`cumulJoueur${derniereMain}`).innerText = cumulJoueur[derniereMain-1]
    cumulJoueur[mainEnCours-1] = parseInt(valeur(carteDouble))
    document.getElementById(`cumulJoueur${mainEnCours}`).innerText = cumulJoueur[mainEnCours-1]

    // La mise en est dédoublée
    gain -= valeurMise
    // sessionStorage.setItem("stack", valeurStack)
    document.getElementById("stackValeur").innerText = valeurStack
    document.getElementById(`miseJoueur${mainEnCours}`).innerText = valeurMise;
    document.getElementById(`miseJoueur${mainEnCours}`).setAttribute("valeur", valeurMise)
    document.getElementById(`miseJoueur${mainEnCours}`).innerHTML += `
        <img class="iconJeton" src="/Multigame/Main/images/jeton_poker.JPG" alt="img_jeton_poker"></img>
    `

    jouerCarte(true);

    // La main en cours est mise en évidence
    document.getElementById(`cartesJoueur1`).style = "bow-shadow : none"
    document.getElementById(`cartesJoueur2`).style = "bow-shadow : none"
    document.getElementById(`cartesJoueur3`).style = "bow-shadow : none"
    document.getElementById(`cartesJoueur4`).style = "bow-shadow : none"
    document.getElementById(`cartesJoueur${mainEnCours}`).style = "box-shadow : 0px 0px 10px white"

    cart1 = document.getElementById(`main${mainEnCours}Carte${carteEnCours}`).getAttribute("name")
    cart2 = document.getElementById(`main${mainEnCours}Carte${carteEnCours-1}`).getAttribute("name")

    if(symbole(cart1) != symbole(cart2)){
        // Le bouton Split est caché
        document.getElementById("btnSplit").style.display = "none"
    }

})

// Quitter les écrans de resultat
document.getElementById("result").addEventListener("click", () => {
    document.getElementById("result").style.display = "none";
    window.location.reload()
})