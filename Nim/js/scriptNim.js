let nbBatons = Math.floor(Math.random() * 3) + 20;
let contener = document.getElementById("nimBatons")
let nbBatonEnleve = 0;
let nbBatonEnleveAdverse = 0;

let textAdvsersaire = document.getElementById("nimAdvserse")

let valeurMise = 100;

// Initialisation de la valeur du stack
let valeurStack = parseInt(sessionStorage.getItem("stack"))
document.getElementById("stackValeur").innerText = valeurStack

function jouer(){

    // Verifier la victoire
    if(nbBatons == 1){
        document.getElementById("victoire").style.display = "block"
        document.getElementById("nimAdverseImg").setAttribute("src", "/Multigame/Main/images/robot/robot_enerve.png")
        document.getElementById("nimAdverse").innerHTML = "Je veux ma revanche !"

        // Mise à jour du stack
        valeurStack += valeurMise;
        sessionStorage.setItem("stack", valeurStack)
        document.getElementById("stackValeur").innerText = valeurStack
        
    } else {
        // Cacher les elements du joueur
        document.getElementById("enleverBatonnet").hidden = true;
        document.getElementById("aVousJouer").hidden = true;
        document.getElementById("passerMain").hidden = true;


        // L'adversaire reflechit
        document.getElementById("nimAdverseImg").setAttribute("src", "/Multigame/Main/images/robot/robot_dodo.png")
        document.getElementById("nimAdverse").innerHTML = "Laisse moi reflechir "

        setTimeout(function() {
            document.getElementById("nimAdverse").innerHTML = "Laisse moi reflechir . "
        }, 1000)

        setTimeout(function() {
            document.getElementById("nimAdverse").innerHTML = "Laisse moi reflechir . . "
        }, 2000)

        setTimeout(function() {
            document.getElementById("nimAdverse").innerHTML = "Laisse moi reflechir . . . "
        }, 3000)
        
        // Affichage des elements du joueur et cache des elements de l'adversaire
        setTimeout(function() {
            document.getElementById("enleverBatonnet").hidden = false;
            document.getElementById("aVousJouer").hidden = false;
            document.getElementById("passerMain").hidden = false;

            document.getElementById("nimAdverseImg").setAttribute("src", "/Multigame/Main/images/robot/robot_normal.png")
            document.getElementById("nimAdverse").innerHTML = "A toi de jouer"

            // Jeu de l'adversaire, s'il peut gagner il gagne, sinon c'est aléatoire
            if(nbBatons<=4){
                nbBatonEnleveAdverse = nbBatons -1;
            } else {
                nbBatonEnleveAdverse = Math.floor(Math.random() * 3) +1;
            }

            for(j=0; j<nbBatonEnleveAdverse; j++){
            document.getElementById(`bat${nbBatons-1}`).hidden = true;
            nbBatons --;

        }
        }, 4000)

        // Reset du nombre de baton enlevé par le joueur
        nbBatonEnleve = 0;
    }
}

// Affichage d'un nombre aléatoire de batonnet au chargement de la page
window.addEventListener("load", () => {
    for(i=0; i<nbBatons; i++){
        contener.innerHTML +=
        `<img src='images/alumette_preview_rev_1.png' alt='img_batonnet' id="bat${i}">`
    }
})

document.getElementById("enleverBatonnet").addEventListener("click", () => {

    // Enlever la modification de la mise
    document.getElementById("votreMise").hidden = true;
    
    // Verification de defaite
    if(nbBatons == 1){
        document.getElementById(`bat${nbBatons-1}`).hidden = true;
        document.getElementById("defaite").style.display = "block"
        document.getElementById("nimAdverseImg").setAttribute("src", "/Multigame/Main/images/robot/robot_moqueur.png")
        document.getElementById("nimAdverse").innerHTML = "Gros nulos !"

        // Mise à jour du stack
        valeurStack -= valeurMise;
        sessionStorage.setItem("stack", valeurStack)
        document.getElementById("stackValeur").innerText = valeurStack
    } else {
        document.getElementById(`bat${nbBatons-1}`).hidden = true;
        nbBatons --;
        nbBatonEnleve += 1;

        if(nbBatonEnleve == 3){
        jouer()
        }
    }
    
    
})

// Passer la main à l'adversaire
document.getElementById("passerMain").addEventListener("click", () => {
    if(nbBatonEnleve==0){
        document.getElementById("errorAucunBaton").style.display = "block"
        document.getElementById("nimAdverseImg").setAttribute("src", "/Multigame/Main/images/robot/robot_enerve.png")
        document.getElementById("nimAdverse").innerHTML = "N'essais pas de tricher !"
    } else {
        jouer()
    }
})

// Quitter les écrans de victoire, defaite et erreur
document.getElementById("victoire").addEventListener("click", () => {
    document.getElementById("victoire").style.display = "none";
    window.location.reload()
})

document.getElementById("defaite").addEventListener("click", () => {
    document.getElementById("defaite").style.display = "none";
    window.location.reload()
})

document.getElementById("errorAucunBaton").addEventListener("click", () => {
    document.getElementById("errorAucunBaton").style.display = "none";
})


// Gestion de la mise
document.getElementById("miseValeur").innerHTML = valeurMise

// Augmentation de la mise
document.getElementById("iconPlus").addEventListener("click", () => {
    if(valeurMise <= (valeurStack - 50)){
        valeurMise += 50
        document.getElementById("miseValeur").innerHTML = valeurMise
    }
})

// Diminution de la mise
document.getElementById("iconMoins").addEventListener("click", () => {
    if(valeurMise > 50){
        valeurMise -= 50
        document.getElementById("miseValeur").innerHTML = valeurMise
    }
})
