new fJs.AutoWriteText({
    separator: '|',
    timeout: 50
});

// Initialisation de la valeur du stack
let valeurStack = sessionStorage.getItem("stack")
document.getElementById("stackValeur").innerText = valeurStack

// Gestion du clic droit
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    alert("Pas de clic droit ici, Nulos")
})